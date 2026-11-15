import json
import logging
import re
from typing import Dict, Any, Optional, List
import httpx

from .config import (
    GNANI_API_KEY,
    EVON_LLM_URL,
    EVON_MODEL,
    REQUEST_TIMEOUT,
)

logger = logging.getLogger("gnani.evon")


def _get_headers() -> Dict[str, str]:
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "AetherNavigator-Gnani/1.0",
    }
    if GNANI_API_KEY:
        headers["X-API-Key-ID"] = GNANI_API_KEY
        headers["Authorization"] = f"Bearer {GNANI_API_KEY}"
    return headers


async def _call_llm_chat(messages: list, temperature: float = 0.2) -> Optional[str]:
    """
    Invoke Evon 3.3 via OpenAI-compatible endpoint.
    If Evon endpoint returns an error, falls back to available model providers.
    """
    payload = {
        "model": EVON_MODEL,
        "messages": messages,
        "temperature": temperature,
    }

    # 1. Try Gnani Evon 3.3 API
    try:
        async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
            resp = await client.post(EVON_LLM_URL, headers=_get_headers(), json=payload)
            if resp.status_code == 200:
                data = resp.json()
                choices = data.get("choices", [])
                if choices and "message" in choices[0]:
                    return choices[0]["message"].get("content", "").strip()
            else:
                logger.warning(f"Evon 3.3 endpoint returned {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.warning(f"Could not connect to Gnani Evon 3.3 endpoint: {exc}")

    # 2. Fallback to existing LLM providers in Backend/.env if needed
    try:
        from config import MODEL, MODEL_PROVIDER
        from langchain.chat_models import init_chat_model
        from langchain_core.messages import SystemMessage, HumanMessage

        llm = init_chat_model(model=MODEL, model_provider=MODEL_PROVIDER)
        lc_msgs = []
        for m in messages:
            if m["role"] == "system":
                lc_msgs.append(SystemMessage(content=m["content"]))
            else:
                lc_msgs.append(HumanMessage(content=m["content"]))
        res = await llm.ainvoke(lc_msgs)
        return getattr(res, "content", "").strip()
    except Exception as fallback_exc:
        logger.error(f"Fallback LLM also failed: {fallback_exc}")

    return None


async def convert_to_english_task(
    transcript: str,
    detected_language: str = "auto",
    recent_context: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """
    Uses Gnani Evon 3.3 to convert a spoken natural-language request in any language
    into a simple, unambiguous browser automation task in English.
    Supports follow-up conversations by taking recent context history into account.

    Returns:
        dict: {
            "english_task": str,
            "detected_language": str, # e.g. "Hindi", "Tamil", "Kannada"
            "language_code": str,     # e.g. "hi-IN", "ta-IN"
            "original_transcript": str
        }
    """
    system_prompt = (
        "You are Evon 3.3, Gnani.ai's high-performance multilingual foundational AI.\n"
        "Your task is to accurately convert and translate the user's spoken voice query into ENGLISH without modifying or adding to it.\n\n"
        "Guidelines:\n"
        "1. DO NOT invent, assume, or add websites, actions, or steps that the user did not say. "
        "Do not rewrite the query into an automated browser command. "
        "(For example: if the user says 'Do something good that make me laugh', do NOT rewrite it as 'Open YouTube and play funny videos' — keep it directly as 'Do something good that make me laugh').\n"
        "2. If the user spoke in English, output the exact user query as-is without any modifications.\n"
        "3. If the user spoke in another language (Hindi, Tamil, Telugu, etc.), translate it faithfully and directly into natural English without altering the original intent.\n"
        "4. Identify the language spoken and standard BCP-47 language code (e.g., 'en-IN' for English, 'hi-IN' for Hindi, 'ta-IN' for Tamil, 'te-IN' for Telugu, 'kn-IN' for Kannada, 'mr-IN' for Marathi, 'bn-IN' for Bengali).\n"
        "5. Output ONLY valid JSON in this format:\n"
        "{\n"
        '  "english_task": "Direct translated user query in English",\n'
        '  "language": "Language Name",\n'
        '  "language_code": "bcp47-code"\n'
        "}"
    )

    context_str = ""
    if recent_context and len(recent_context) > 0:
        context_str = "\nRecent Conversation History:\n" + "\n".join(recent_context[-4:]) + "\n"

    user_prompt = f"{context_str}Current User Voice Transcript: \"{transcript}\"\nDetected Language Hint: {detected_language}"

    response_text = await _call_llm_chat([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ])

    if response_text:
        try:
            # Strip markdown formatting if any
            clean_json = re.sub(r"^```(?:json)?\s*|\s*```$", "", response_text.strip(), flags=re.MULTILINE)
            parsed = json.loads(clean_json)
            return {
                "english_task": parsed.get("english_task", transcript),
                "detected_language": parsed.get("language", "English"),
                "language_code": parsed.get("language_code", "hi-IN"),
                "original_transcript": transcript,
            }
        except Exception:
            pass

    # Basic fallback if JSON parsing fails
    return {
        "english_task": response_text or transcript,
        "detected_language": detected_language if detected_language != "auto" else "Hindi",
        "language_code": "hi-IN" if detected_language == "auto" else detected_language,
        "original_transcript": transcript,
    }


async def translate_to_native_language(
    english_summary: str,
    target_language: str,
    language_code: str = "hi-IN",
) -> str:
    """
    Uses Gnani Evon 3.3 to translate DeepSeek's final browser automation summary
    back into the original language spoken by the user so it can be spoken out
    using Gnani Timber 2.5 TTS.
    """
    if not english_summary:
        return ""

    system_prompt = (
        f"You are Evon 3.3, Gnani.ai's voice assistant speaking in {target_language} ({language_code}).\n"
        "Your task is to tell the user the final result in 1 to 2 short, simple, everyday conversational sentences.\n\n"
        "Rules:\n"
        "1. Be extremely brief (1-2 short sentences max). Avoid long paragraphs.\n"
        "2. Speak directly and casually, like a helpful friend to someone who doesn't know technical jargon.\n"
        "3. Do NOT explain step-by-step actions, button checks, page observations, or internal logs.\n"
        "4. Directly state the outcome or what the user needs to do next.\n"
        "   - If action needed: 'लाइक करने के लिए पहले यूट्यूब में साइन इन करना पड़ेगा।' / 'You need to sign in to YouTube to like this video.'\n"
        "   - If success: 'मैंने आपके लिए वीडियो चला दिया है।' / 'I have started playing the video for you.'\n"
        "   - If answering price/details: 'इसकी कीमत चौवन हजार रुपये है।' / 'The price is 54,000 rupees.'\n"
        "5. Output only the plain spoken text in the target language. Never include quotes, bullet points, or markdown formatting."
    )

    translated = await _call_llm_chat([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": english_summary}
    ], temperature=0.3)

    return translated or english_summary
