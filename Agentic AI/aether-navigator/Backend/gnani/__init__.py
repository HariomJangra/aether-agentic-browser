"""
Gnani AI Integration Module for Aether Navigator.
Provides:
- Prisma (Speech-to-Text / ASR)
- Evon 3.3 (NLU, Task formulation, Multilingual translation)
- Timber 2.5 (Text-to-Speech / TTS)
"""

from .routes import gnani_router
from .config import GNANI_API_KEY, PRISMA_MODEL, EVON_MODEL, TIMBRE_MODEL

ENABLE_GNANI = True

__all__ = [
    "gnani_router",
    "ENABLE_GNANI",
    "GNANI_API_KEY",
    "PRISMA_MODEL",
    "EVON_MODEL",
    "TIMBRE_MODEL",
]

