import asyncio
import base64
import json
import queue as _queue
from typing import Optional
from fastapi import APIRouter
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel

from .config import (
    GNANI_API_KEY,
    PRISMA_MODEL,
    EVON_MODEL,
    TIMBRE_MODEL,
)
from .prisma_stt import transcribe_audio
from .evon_llm import convert_to_english_task, translate_to_native_language
from .timber_tts import synthesize_speech_data_url
from utils import sse_event, send_winui_signal
from memory import session_manager
from agent import get_agent, ensure_active_tab
from routes import _content_to_text

gnani_router = APIRouter(prefix="/gnani", tags=["gnani"])


class AudioPayload(BaseModel):
    audio_base64: str
    format: str = "wav"
    language_code: str = "auto"
    session_id: str = "default"


class TTSRequest(BaseModel):
    text: str
    language_code: str = "hi-IN"
    voice: Optional[str] = None


class VoiceChatRequest(BaseModel):
    audio_base64: str
    format: str = "wav"
    session_id: str = "default"


@gnani_router.get("/status")
async def gnani_status():
    """Returns the operational status of the Gnani AI models."""
    return {
        "status": "ready" if GNANI_API_KEY else "key_missing",
        "api_key_configured": bool(GNANI_API_KEY),
        "api_key_prefix": GNANI_API_KEY[:8] + "..." if GNANI_API_KEY else None,
        "models": {
            "stt": PRISMA_MODEL,
            "llm": EVON_MODEL,
            "tts": TIMBRE_MODEL,
        }
    }


def _extract_audio_bytes(raw_base64: str) -> bytes:
    """Helper to decode base64 audio data, stripping data URI prefix if present."""
    if "," in raw_base64:
        raw_base64 = raw_base64.split(",", 1)[1]
    return base64.b64decode(raw_base64)


@gnani_router.post("/transcribe")
async def transcribe_speech_endpoint(body: AudioPayload):
    """
    Step 1 & 2:
    Accepts spoken audio (base64) in any language, transcribes with Gnani Prisma STT,
    and uses Evon 3.3 to convert into a clean English browser automation task.
    """
    try:
        audio_bytes = _extract_audio_bytes(body.audio_base64)
    except Exception as exc:
        return JSONResponse(status_code=400, content={"error": f"Invalid base64 audio: {exc}"})

    content_type = f"audio/{body.format}"
    filename = f"voice.{body.format}"

    stt_res = await transcribe_audio(
        audio_bytes=audio_bytes,
        filename=filename,
        content_type=content_type,
        language_code=body.language_code,
    )

    transcript = stt_res.get("transcript", "")
    detected_lang = stt_res.get("language", "auto")

    if not transcript:
        return JSONResponse(status_code=400, content={
            "error": stt_res.get("error") or "No speech detected in audio.",
            "stt_raw": stt_res,
        })

    # Use Evon 3.3 to formulate English browser task with multi-turn context
    memory = session_manager.get_memory(body.session_id)
    recent_context = []
    for msg in memory.get()[-4:]:
        cls = msg.__class__.__name__
        if cls == "HumanMessage":
            recent_context.append(f"User: {msg.content}")
        elif cls == "AIMessage":
            recent_context.append(f"Assistant: {getattr(msg, 'content', '')[:160]}")

    task_res = await convert_to_english_task(
        transcript=transcript,
        detected_language=detected_lang,
        recent_context=recent_context,
    )

    return {
        "transcript": transcript,
        "detected_language": task_res.get("detected_language", detected_lang),
        "language_code": task_res.get("language_code", "hi-IN"),
        "english_task": task_res.get("english_task", transcript),
        "confidence": stt_res.get("confidence", 1.0),
    }


@gnani_router.post("/tts")
async def tts_endpoint(body: TTSRequest):
    """Synthesizes speech using Gnani Timber 2.5 TTS."""
    data_url = await synthesize_speech_data_url(
        text=body.text,
        language_code=body.language_code,
        voice=body.voice,
    )
    if not data_url:
        return JSONResponse(status_code=500, content={"error": "Timber 2.5 TTS synthesis failed."})
    return {"audio_url": data_url}


async def stream_gnani_voice_pipeline(audio_bytes: bytes, format_str: str, session_id: str):
    """
    End-to-End Voice Pipeline Generator (SSE):
    1. Gnani Prisma STT (Any language -> text + language detection)
    2. Gnani Evon 3.3 (Formulate English browser automation task)
    3. DeepSeek Agent (Executes browser automation in real-time)
    4. Gnani Evon 3.3 (Translates English summary back into user's spoken language)
    5. Gnani Timber 2.5 (Synthesizes spoken audio in original language)
    """
    ensure_active_tab()
    yield sse_event({"type": "gnani_status", "step": "prisma_stt", "message": "Listening with Gnani Prisma..."})

    # 1. Transcribe with Prisma STT
    filename = f"recording.{format_str}"
    content_type = f"audio/{format_str}"
    stt_res = await transcribe_audio(audio_bytes, filename=filename, content_type=content_type)
    transcript = stt_res.get("transcript", "")
    detected_lang = stt_res.get("language", "auto")

    if not transcript:
        err = stt_res.get("error") or "Gnani Prisma could not detect speech from audio."
        yield sse_event({"type": "error", "content": err})
        yield sse_event({"type": "done"})
        return

    yield sse_event({
        "type": "gnani_stt_result",
        "transcript": transcript,
        "language": detected_lang,
    })

    # 2. Evon 3.3 Task formulation with multi-turn context
    yield sse_event({"type": "gnani_status", "step": "evon_task", "message": "Evon 3.3 converting task to English..."})

    memory = session_manager.get_memory(session_id)
    recent_context = []
    for msg in memory.get()[-4:]:
        cls = msg.__class__.__name__
        if cls == "HumanMessage":
            recent_context.append(f"User: {msg.content}")
        elif cls == "AIMessage":
            recent_context.append(f"Assistant: {getattr(msg, 'content', '')[:160]}")

    task_res = await convert_to_english_task(
        transcript=transcript,
        detected_language=detected_lang,
        recent_context=recent_context,
    )
    LOCALE_TO_NAME = {
        "en-IN": "English", "en-US": "English", "en": "English",
        "hi-IN": "Hindi", "hi": "Hindi",
        "ta-IN": "Tamil", "ta": "Tamil",
        "te-IN": "Telugu", "te": "Telugu",
        "kn-IN": "Kannada", "kn": "Kannada",
        "mr-IN": "Marathi", "mr": "Marathi",
        "bn-IN": "Bengali", "bn": "Bengali",
        "gu-IN": "Gujarati", "gu": "Gujarati",
        "ml-IN": "Malayalam", "ml": "Malayalam",
        "pa-IN": "Punjabi", "pa": "Punjabi",
    }

    english_task = task_res.get("english_task", transcript)
    lang_code = detected_lang if (detected_lang and detected_lang not in ["auto", "indic-auto"]) else (task_res.get("language_code") or "hi-IN")
    lang_name = task_res.get("detected_language") or LOCALE_TO_NAME.get(lang_code, "Hindi")
    print(f"[Gnani Pipeline] Resolved language for turn: {lang_name} ({lang_code})")

    yield sse_event({
        "type": "gnani_task_result",
        "english_task": english_task,
        "language": lang_name,
        "language_code": lang_code,
    })

    # 3. DeepSeek Agent Execution
    # ──────────────────────────────────────────────────────────────────
    # agent.stream() is SYNCHRONOUS and blocks. Since this generator is
    # async (we need await for steps 1,2,4,5), running agent.stream()
    # directly here would freeze the event loop and batch all SSE events.
    #
    # Fix: run the blocking loop in a real thread via run_in_executor,
    # push SSE strings into a thread-safe queue.Queue, and drain it here
    # with await so each event flushes to the client immediately — same
    # behavior as the sync text-chat generator.
    # ──────────────────────────────────────────────────────────────────
    yield sse_event({"type": "gnani_status", "step": "deepseek_executing", "message": "DeepSeek automating browser..."})

    agent = get_agent()
    memory = session_manager.get_memory(session_id)
    stop_event = session_manager.get_stop_event(session_id)
    stop_event.clear()

    memory.add("user", english_task)
    base_index = len(memory.get())
    send_winui_signal("START")

    ai_reply = ""
    seen_messages = set()

    def _msg_key(msg, fallback_index: int) -> str:
        msg_id = getattr(msg, "id", None)
        if isinstance(msg_id, str) and msg_id:
            return msg_id
        return f"{msg.__class__.__name__}:{getattr(msg, 'name', '')}:{_content_to_text(getattr(msg, 'content', ''))}:{fallback_index}"

    # Thread-safe queue + sentinel to bridge sync thread → async generator
    _SENTINEL = object()
    sync_q: _queue.Queue = _queue.Queue()
    messages_snapshot = list(memory.get())  # snapshot so thread doesn't race

    def _agent_worker():
        """Runs in a threadpool thread — blocks here are fine."""
        nonlocal ai_reply
        try:
            for step in agent.stream({"messages": messages_snapshot}, stream_mode="values"):
                if stop_event.is_set():
                    sync_q.put(sse_event({"type": "stopped", "content": "Task stopped by user."}))
                    break

                updates = [step] if isinstance(step, dict) else []
                for update in updates:
                    for i, msg in enumerate(update.get("messages", [])):
                        if i < base_index:
                            continue
                        key = _msg_key(msg, i)
                        if key in seen_messages:
                            continue
                        seen_messages.add(key)
                        msg_cls = msg.__class__.__name__

                        if hasattr(msg, "tool_calls") and msg.tool_calls:
                            for tc in msg.tool_calls:
                                sync_q.put(sse_event({"type": "tool_call", "name": tc["name"], "args": tc["args"]}))
                        elif hasattr(msg, "name") and msg.name:
                            preview = _content_to_text(getattr(msg, "content", ""))[:400].replace("\n", " ")
                            sync_q.put(sse_event({"type": "tool_result", "name": msg.name, "preview": preview}))
                        elif msg_cls == "AIMessage" and hasattr(msg, "content"):
                            text = _content_to_text(msg.content)
                            if text:
                                ai_reply = text
                                sync_q.put(sse_event({"type": "ai_message", "content": ai_reply}))
        except Exception as exc:
            sync_q.put(sse_event({"type": "error", "content": f"DeepSeek execution error: {str(exc)}"}))
        finally:
            send_winui_signal("STOP")
            sync_q.put(_SENTINEL)

    loop = asyncio.get_running_loop()
    agent_future = loop.run_in_executor(None, _agent_worker)

    # Drain the queue: run_in_executor(sync_q.get) blocks the threadpool
    # thread (NOT the event loop), so each yield flushes instantly.
    try:
        while True:
            item = await loop.run_in_executor(None, sync_q.get)
            if item is _SENTINEL:
                break
            yield item
    except (asyncio.CancelledError, GeneratorExit):
        # Client disconnected / aborted — signal the worker thread to stop
        stop_event.set()
        # Drain remaining items so the worker thread can finish and unblock
        while True:
            try:
                item = sync_q.get(timeout=0.1)
                if item is _SENTINEL:
                    break
            except _queue.Empty:
                if agent_future.done():
                    break
        return

    # Ensure the worker thread is fully done before continuing
    await agent_future

    memory.add("ai", ai_reply)

    # 4 & 5: If we have an AI response, translate back with Evon 3.3 and voice with Timber 2.5
    if ai_reply and not stop_event.is_set():
        yield sse_event({"type": "gnani_status", "step": "evon_translating", "message": f"Evon 3.3 translating back to {lang_name}..."})
        translated_reply = await translate_to_native_language(
            english_summary=ai_reply,
            target_language=lang_name,
            language_code=lang_code,
        )

        yield sse_event({
            "type": "gnani_native_reply",
            "text": translated_reply,
            "language": lang_name,
        })

        yield sse_event({"type": "gnani_status", "step": "timber_tts", "message": "Timber 2.5 synthesizing voice..."})
        audio_data_url = await synthesize_speech_data_url(
            text=translated_reply,
            language_code=lang_code,
        )

        if audio_data_url:
            yield sse_event({
                "type": "gnani_audio",
                "audio_url": audio_data_url,
                "text": translated_reply,
                "language": lang_name,
            })

    yield sse_event({"type": "done"})


@gnani_router.post("/voice-chat")
async def voice_chat_endpoint(body: VoiceChatRequest):
    """
    Unified Voice-to-Action-to-Voice Streaming Endpoint.
    Accepts speech (base64), executes browser automation, speaks response back in native language.
    """
    try:
        audio_bytes = _extract_audio_bytes(body.audio_base64)
    except Exception as exc:
        return JSONResponse(status_code=400, content={"error": f"Invalid audio: {exc}"})

    return StreamingResponse(
        stream_gnani_voice_pipeline(
            audio_bytes=audio_bytes,
            format_str=body.format,
            session_id=body.session_id,
        ),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
