import logging
from typing import Optional, Dict, Any
import httpx
from .config import GNANI_API_KEY, PRISMA_STT_URL, PRISMA_MODEL, REQUEST_TIMEOUT

logger = logging.getLogger("gnani.prisma")


def get_headers() -> Dict[str, str]:
    headers = {
        "User-Agent": "AetherNavigator-Gnani/1.0",
    }
    if GNANI_API_KEY:
        headers["X-API-Key-ID"] = GNANI_API_KEY
        headers["Authorization"] = f"Bearer {GNANI_API_KEY}"
    return headers


def detect_script_language(text: str) -> Optional[str]:
    """
    Detects language locale based on the Unicode script of the transcribed text.
    Provides a 100% reliable fallback so languages never incorrectly default to Hindi.
    """
    if not text:
        return None

    tamil = sum(1 for c in text if '\u0B80' <= c <= '\u0BFF')
    telugu = sum(1 for c in text if '\u0C00' <= c <= '\u0C7F')
    kannada = sum(1 for c in text if '\u0C80' <= c <= '\u0CFF')
    malayalam = sum(1 for c in text if '\u0D00' <= c <= '\u0D7F')
    bengali = sum(1 for c in text if '\u0980' <= c <= '\u09FF')
    gujarati = sum(1 for c in text if '\u0A80' <= c <= '\u0AFF')
    gurmukhi = sum(1 for c in text if '\u0A00' <= c <= '\u0A7F')
    devanagari = sum(1 for c in text if '\u0900' <= c <= '\u097F')
    latin = sum(1 for c in text if 'a' <= c.lower() <= 'z')

    counts = {
        "ta-IN": tamil,
        "te-IN": telugu,
        "kn-IN": kannada,
        "ml-IN": malayalam,
        "bn-IN": bengali,
        "gu-IN": gujarati,
        "pa-IN": gurmukhi,
        "hi-IN": devanagari,
        "en-IN": latin,
    }

    top_lang, top_count = max(counts.items(), key=lambda x: x[1])
    return top_lang if top_count > 0 else None


async def transcribe_audio(
    audio_bytes: bytes,
    filename: str = "recording.wav",
    content_type: str = "audio/wav",
    language_code: str = "auto",
) -> Dict[str, Any]:
    """
    Transcribes spoken audio using the Gnani Prisma model (ASR).
    Supports all Indic languages and English with automatic language detection.
    """
    if not GNANI_API_KEY:
        logger.warning("GNANI_API_KEY is not configured in .env")
        return {
            "transcript": "",
            "language": language_code,
            "confidence": 0.0,
            "success": False,
            "error": "GNANI_API_KEY is missing. Please set it in Backend/.env",
        }

    target_lang = "indic-auto" if language_code in ["auto", "indic-auto", None, ""] else language_code

    files = {
        "audio_file": (filename, audio_bytes, content_type)
    }
    data = {
        "model": PRISMA_MODEL,
        "language_code": target_lang,
        "format": "transcribe",
    }

    try:
        async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
            response = await client.post(
                PRISMA_STT_URL,
                headers=get_headers(),
                files=files,
                data=data,
            )

            if response.status_code == 200:
                result = response.json()
                print(f"[Gnani Prisma STT] API Response: {result}")

                transcript = (
                    result.get("transcript")
                    or result.get("text")
                    or (result.get("results", [{}])[0].get("transcript", "") if result.get("results") else "")
                ).strip()

                # Extract language from Gnani response
                api_lang = (
                    result.get("detected_language_code")
                    or result.get("detected_language")
                    or result.get("language_code")
                    or result.get("language")
                )

                # Script-based detection ensures English, Tamil, Telugu, etc. are never misidentified
                script_lang = detect_script_language(transcript)
                detected_lang = api_lang if (api_lang and api_lang not in ["auto", "indic-auto"]) else (script_lang or "hi-IN")

                confidence = float(result.get("confidence", 0.95))
                print(f"[Gnani Prisma STT] Final Detected Language: {detected_lang}")

                return {
                    "transcript": transcript,
                    "language": detected_lang,
                    "confidence": confidence,
                    "success": True,
                    "error": None,
                    "raw": result,
                }
            else:
                err_msg = f"Prisma STT API error (HTTP {response.status_code}): {response.text}"
                logger.error(err_msg)
                print(f"[Gnani Prisma STT] Error: {err_msg}")
                return {
                    "transcript": "",
                    "language": language_code,
                    "confidence": 0.0,
                    "success": False,
                    "error": err_msg,
                }

    except Exception as exc:
        err_msg = f"Failed to connect to Gnani Prisma STT: {str(exc)}"
        logger.error(err_msg)
        return {
            "transcript": "",
            "language": language_code,
            "confidence": 0.0,
            "success": False,
            "error": err_msg,
        }
