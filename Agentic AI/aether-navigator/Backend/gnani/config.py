import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
_backend_dir = Path(__file__).resolve().parent.parent
load_dotenv(_backend_dir / ".env")

# ── Gnani Authentication ──
# Gnani Vachana API Key starts with 'vach_'
GNANI_API_KEY = os.getenv("GNANI_API_KEY", "") or os.getenv("VACHANA_API_KEY", "")

# Fallback: check test.ipynb in workspace if not set in .env yet
if not GNANI_API_KEY:
    try:
        import json
        notebook_path = _backend_dir.parent.parent / "GnaniAI" / "test.ipynb"
        if notebook_path.exists():
            with open(notebook_path, "r", encoding="utf-8") as f:
                nb = json.load(f)
                for cell in nb.get("cells", []):
                    for line in cell.get("source", []):
                        if "GNANI_API_KEY" in line and "=" in line:
                            val = line.split("=", 1)[1].strip().strip('"').strip("'")
                            if val.startswith("vach_"):
                                GNANI_API_KEY = val
                                break
    except Exception:
        pass

# ── Service Endpoints ──
GNANI_BASE_URL = os.getenv("GNANI_BASE_URL", "https://api.vachana.ai")

# 1. Prisma: Speech-to-Text (ASR)
PRISMA_STT_URL = os.getenv("GNANI_PRISMA_STT_URL", f"{GNANI_BASE_URL}/stt/v3")
PRISMA_MODEL = os.getenv("GNANI_PRISMA_MODEL", "prisma-v3.0")

# 2. Evon 3.3: Task Extraction, NLU & Multilingual Translation
EVON_LLM_URL = os.getenv("GNANI_EVON_URL", f"{GNANI_BASE_URL}/v1/chat/completions")
EVON_MODEL = os.getenv("GNANI_EVON_MODEL", "gnani-evon-v3.3-30B-A3B")

# 3. Timbre 2.5: Text-to-Speech (TTS)
TIMBRE_TTS_URL = os.getenv("GNANI_TIMBRE_TTS_URL", f"{GNANI_BASE_URL}/api/v1/tts/inference")
TIMBRE_MODEL = os.getenv("GNANI_TIMBRE_MODEL", "timbre-v2.5")
TIMBRE_DEFAULT_VOICE = os.getenv("GNANI_TIMBRE_VOICE", "Karan")
TIMBRE_SAMPLE_RATE = int(os.getenv("GNANI_TIMBRE_SAMPLE_RATE", "22050"))

# Request timeouts
REQUEST_TIMEOUT = float(os.getenv("GNANI_TIMEOUT", "30.0"))

