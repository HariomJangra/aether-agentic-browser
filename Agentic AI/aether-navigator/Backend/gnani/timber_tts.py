import base64
import logging
from typing import Optional, Dict
import httpx

from .config import (
    GNANI_API_KEY,
    TIMBRE_TTS_URL,
    TIMBRE_MODEL,
    TIMBRE_DEFAULT_VOICE,
    TIMBRE_SAMPLE_RATE,
    REQUEST_TIMEOUT,
)

logger = logging.getLogger("gnani.timber")


def _get_headers() -> Dict[str, str]:
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "AetherNavigator-Gnani/1.0",
    }
    if GNANI_API_KEY:
        headers["X-API-Key-ID"] = GNANI_API_KEY
        headers["Authorization"] = f"Bearer {GNANI_API_KEY}"
    return headers


# Official language-to-voice mapping for Gnani Timber
VOICE_MAP = {
    # English (Kaveri is official English voice)
    "en-in": "Kaveri",
    "en-us": "Kaveri",
    "en": "Kaveri",
    # Hindi (Nalini / Pranav)
    "hi-in": "Nalini",
    "hi": "Nalini",
    # Tamil (Nalini)
    "ta-in": "Nalini",
    "ta": "Nalini",
    # Telugu (Pranav / Nalini)
    "te-in": "Pranav",
    "te": "Pranav",
    # Kannada (Nalini)
    "kn-in": "Nalini",
    "kn": "Nalini",
    # Marathi (Asmita / Nalini)
    "mr-in": "Asmita",
    "mr": "Asmita",
    # Bengali (Shubhra / Nalini)
    "bn-in": "Shubhra",
    "bn": "Shubhra",
    # Gujarati (Nalini)
    "gu-in": "Nalini",
    "gu": "Nalini",
    # Malayalam (Nalini)
    "ml-in": "Nalini",
    "ml": "Nalini",
    # Punjabi (Nalini / Karan)
    "pa-in": "Nalini",
    "pa": "Nalini",
}

NORMALIZE_LANG = {
    "hindi": "hi-IN",
    "hi": "hi-IN",
    "tamil": "ta-IN",
    "ta": "ta-IN",
    "telugu": "te-IN",
    "te": "te-IN",
    "kannada": "kn-IN",
    "kn": "kn-IN",
    "marathi": "mr-IN",
    "mr": "mr-IN",
    "bengali": "bn-IN",
    "bn": "bn-IN",
    "gujarati": "gu-IN",
    "gu": "gu-IN",
    "malayalam": "ml-IN",
    "ml": "ml-IN",
    "punjabi": "pa-IN",
    "pa": "pa-IN",
    "english": "en-IN",
    "en": "en-IN",
}


def normalize_locale(language_code: str) -> str:
    lang = (language_code or "").lower().strip()
    if lang in NORMALIZE_LANG:
        return NORMALIZE_LANG[lang]
    if "-" in lang:
        parts = lang.split("-")
        return f"{parts[0].lower()}-{parts[1].upper()}"
    return "en-IN" if "en" in lang else "hi-IN"


def get_default_voice(language_code: str) -> str:
    norm = normalize_locale(language_code).lower()
    return VOICE_MAP.get(norm, VOICE_MAP.get(norm.split("-")[0], "Kaveri" if "en" in norm else "Nalini"))


async def synthesize_speech(
    text: str,
    language_code: str = "hi-IN",
    voice: Optional[str] = None,
) -> Optional[bytes]:
    """
    Synthesizes speech audio using Gnani Timber 2.5 TTS model.
    Endpoint: POST https://api.vachana.ai/api/v1/tts/inference

    Returns:
        bytes: Raw WAV audio bytes, or None on failure.
    """
    if not text or not text.strip():
        return None

    if not GNANI_API_KEY:
        print("[Gnani Timber TTS] Error: GNANI_API_KEY is missing from .env")
        logger.warning("GNANI_API_KEY is not configured in .env; skipping Timber TTS")
        return None

    norm_lang = normalize_locale(language_code)
    selected_voice = voice or get_default_voice(norm_lang)

    payload = {
        "text": text.strip(),
        "voice": selected_voice,
        "model": TIMBRE_MODEL,
        "language": norm_lang,
        "speed": 1,
        "audio_config": {
            "encoding": "linear_pcm",
            "container": "wav",
            "num_channels": 1,
            "sample_rate": TIMBRE_SAMPLE_RATE,
            "sample_width": 2,
        },
    }

    print(f"[Gnani Timber TTS] Synthesizing speech with voice={selected_voice}, lang={norm_lang}, model={TIMBRE_MODEL}...")

    try:
        async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
            resp = await client.post(
                TIMBRE_TTS_URL,
                headers=_get_headers(),
                json=payload,
            )

            print(f"[Gnani Timber TTS] Response status: {resp.status_code}")

            if resp.status_code == 200:
                content_type = resp.headers.get("content-type", "")
                if "application/json" in content_type:
                    data = resp.json()
                    b64 = data.get("audio") or data.get("audio_content") or data.get("audio_data")
                    if b64:
                        return base64.b64decode(b64)
                print(f"[Gnani Timber TTS] Successfully received {len(resp.content)} bytes of WAV audio!")
                return resp.content

            print(f"[Gnani Timber TTS] API returned error (HTTP {resp.status_code}): {resp.text}")

            # Fallback 1: Try universal voice (Kaveri for English, Nalini for Indic)
            fallback_voice = "Kaveri" if "en" in norm_lang else "Nalini"
            if selected_voice != fallback_voice:
                print(f"[Gnani Timber TTS] Retrying with universal voice: {fallback_voice}...")
                payload["voice"] = fallback_voice
                retry_resp = await client.post(TIMBRE_TTS_URL, headers=_get_headers(), json=payload)
                if retry_resp.status_code == 200:
                    print(f"[Gnani Timber TTS] Success on fallback voice retry! Received {len(retry_resp.content)} bytes")
                    return retry_resp.content

            # Fallback 2: Try timbre-v2.0
            print("[Gnani Timber TTS] Retrying with model timbre-v2.0...")
            payload["model"] = "timbre-v2.0"
            retry_resp2 = await client.post(TIMBRE_TTS_URL, headers=_get_headers(), json=payload)
            if retry_resp2.status_code == 200:
                print(f"[Gnani Timber TTS] Success on timbre-v2.0 retry! Received {len(retry_resp2.content)} bytes")
                return retry_resp2.content

            return None

    except Exception as exc:
        print(f"[Gnani Timber TTS] Connection error: {exc}")
        logger.error(f"Error calling Timber 2.5 TTS: {exc}")
        return None


async def synthesize_speech_data_url(
    text: str,
    language_code: str = "hi-IN",
    voice: Optional[str] = None,
) -> Optional[str]:
    """
    Returns audio as a data URL ('data:audio/wav;base64,...')
    ready to be played directly by the frontend's HTML5 Audio element.
    """
    audio_bytes = await synthesize_speech(text, language_code, voice)
    if not audio_bytes:
        return None
    b64 = base64.b64encode(audio_bytes).decode("ascii")
    return f"data:audio/wav;base64,{b64}"
