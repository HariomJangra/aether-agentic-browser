from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from agent import get_agent
from cdp import get_active_tab
from memory import session_manager
from utils import send_winui_signal, sse_event
from agent import ensure_active_tab


router = APIRouter()


# ── Request models

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"


class SessionRequest(BaseModel):
    session_id: str = "default"


# ── SSE streaming logic

def _content_to_text(content) -> str:
    """Normalize model content into plain text for SSE/UI."""
    if content is None:
        return ""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, dict):
                text = item.get("text")
                if isinstance(text, str):
                    parts.append(text)
        return "".join(parts).strip()
    if isinstance(content, dict):
        text = content.get("text")
        if isinstance(text, str):
            return text
    return str(content)

def stream_chat(user_input: str, session_id: str):
    """
    Generator that runs the agent and yields SSE events.
    Each yield is one chunk the browser receives in real time.
    """

    agent = get_agent()  # waits if agent isn't ready yet
    memory = session_manager.get_memory(session_id)
    stop_event = session_manager.get_stop_event(session_id)

    stop_event.clear()
    memory.add("user", user_input)
    # Only stream messages added after this request starts.
    base_index = len(memory.get())
    send_winui_signal("START")

    ai_reply = ""

    seen_messages: set[str] = set()

    def _msg_key(msg, fallback_index: int) -> str:
        msg_id = getattr(msg, "id", None)
        if isinstance(msg_id, str) and msg_id:
            return msg_id
        return f"{msg.__class__.__name__}:{getattr(msg, 'name', '')}:{_content_to_text(getattr(msg, 'content', ''))}:{fallback_index}"

    try:
        # "values" includes the evolving full state and reliably contains the final AI turn.
        for step in agent.stream({"messages": memory.get()}, stream_mode="values"):
            if stop_event.is_set():
                yield sse_event({"type": "stopped", "content": "Task stopped by user."})
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

                    # Agent is calling a tool
                    if hasattr(msg, "tool_calls") and msg.tool_calls:
                        for tc in msg.tool_calls:
                            yield sse_event({"type": "tool_call", "name": tc["name"], "args": tc["args"]})

                    # Tool returned a result
                    elif hasattr(msg, "name") and msg.name:
                        preview = _content_to_text(getattr(msg, "content", ""))[:400].replace("\n", " ")
                        yield sse_event({"type": "tool_result", "name": msg.name, "preview": preview})

                    # Agent sent a text reply
                    elif msg_cls == "AIMessage" and hasattr(msg, "content"):
                        text = _content_to_text(msg.content)
                        if not text:
                            continue
                        ai_reply = text
                        yield sse_event({"type": "ai_message", "content": ai_reply})

    except Exception as exc:
        yield sse_event({"type": "error", "content": str(exc)})
    finally:
        send_winui_signal("STOP")

    if not ai_reply:
        ai_reply = "I completed tool actions but did not produce a final text response. Please retry."
        yield sse_event({"type": "ai_message", "content": ai_reply})

    memory.add("ai", ai_reply)
    yield sse_event({"type": "done"})


# ── Endpoints

@router.post("/chat")
async def chat(body: ChatRequest):
    if not body.message.strip():
        return {"error": "Empty message"}
    ensure_active_tab()   # Always sync active tab right when a chat send request arrives
    return StreamingResponse(
        stream_chat(body.message.strip(), body.session_id),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@router.post("/cdp/ensure-active")
async def cdp_ensure_active():
    """Ensure agent-browser is focused on the current active browser tab."""
    result = ensure_active_tab()
    return {"result": result}


@router.post("/stop")
async def stop(body: SessionRequest):
    session_manager.request_stop(body.session_id)
    send_winui_signal("STOP")
    return {"status": "stopping"}


@router.post("/clear")
async def clear(body: SessionRequest):
    session_manager.clear_memory(body.session_id)
    return {"status": "cleared"}


@router.get("/status")
async def status(session_id: str = "default"):
    memory = session_manager.get_memory(session_id)
    return {"status": "running", "messages": memory.length()}


@router.get("/context")
async def context(session_id: str = "default"):
    memory = session_manager.get_memory(session_id)
    result = []
    for msg in memory.get():
        cls = msg.__class__.__name__
        if cls == "SystemMessage":
            result.append({"role": "system", "content": "System prompt"})
        elif cls == "HumanMessage":
            result.append({"role": "user", "content": msg.content})
        elif cls == "AIMessage":
            result.append({"role": "ai", "content": msg.content})
    return {"messages": result}


@router.get("/cdp/active")
async def cdp_active():
    """Return the active tab info from CDP as {active:{title,type,url}}."""
    return get_active_tab()