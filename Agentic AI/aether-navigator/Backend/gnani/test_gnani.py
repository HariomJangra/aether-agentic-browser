import asyncio
import os
import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from gnani.config import GNANI_API_KEY, PRISMA_MODEL, EVON_MODEL, TIMBRE_MODEL
from gnani.evon_llm import convert_to_english_task, translate_to_native_language
from gnani.prisma_stt import transcribe_audio
from gnani.timber_tts import get_default_voice, synthesize_speech_data_url


async def test_gnani_components():
    print("=" * 60)
    print("GNANI AI INTEGRATION TEST")
    print("=" * 60)
    print(f"API Key present: {bool(GNANI_API_KEY)} ({GNANI_API_KEY[:10]}... if present)")
    print(f"Models: STT={PRISMA_MODEL}, LLM={EVON_MODEL}, TTS={TIMBRE_MODEL}")

    # Test Evon 3.3 Task formulation
    print("\n--- Testing Evon 3.3 Task Formulation ---")
    hindi_voice_transcript = "यूट्यूब पर अरिजीत सिंह के गाने चलाओ"
    task_res = await convert_to_english_task(hindi_voice_transcript, "Hindi")
    print(f"Original Voice Transcript: {hindi_voice_transcript}")
    print(f"Evon 3.3 Converted Task:   {task_res.get('english_task')}")
    print(f"Detected Language:         {task_res.get('detected_language')} ({task_res.get('language_code')})")

    # Test Evon 3.3 Translation back
    print("\n--- Testing Evon 3.3 Translation Back to Native Language ---")
    deepseek_summary = "I have opened YouTube, searched for Arijit Singh songs, and played the top track."
    native_res = await translate_to_native_language(
        english_summary=deepseek_summary,
        target_language="Hindi",
        language_code="hi-IN",
    )
    print(f"DeepSeek English Summary: {deepseek_summary}")
    print(f"Evon Translated Reply:    {native_res}")

    # Test Timber 2.5 voice resolution
    print("\n--- Testing Timber 2.5 Voice Selection ---")
    for lang in ["hi-IN", "ta-IN", "te-IN", "kn-IN", "mr-IN", "bn-IN", "en-US"]:
        print(f"Language: {lang:6} -> Timber 2.5 Voice: {get_default_voice(lang)}")

    print("\n" + "=" * 60)
    print("TEST COMPLETED SUCCESSFULLY!")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(test_gnani_components())

