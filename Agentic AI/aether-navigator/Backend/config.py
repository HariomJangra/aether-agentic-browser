HOST = "0.0.0.0"
PORT = 5050

WINUI_HOST = "127.0.0.1"
WINUI_PORT = 8080
WINUI_TIMEOUT = 0.5

# Mistral AI model configuration
# MODEL = "mistral-small-latest"
# MODEL_PROVIDER = "mistralai"

# MODEL = "gemma-4-31b-it"
# MODEL_PROVIDER = "google_genai"

# MODEL = "deepseek/deepseek-v4.1-flash-1017"
# MODEL_PROVIDER = "openrouter"

MODEL = "deepseek-flash"
MODEL_PROVIDER = "deepseek"

SYSTEM_PROMPT = (
    "You are a helpful browser automation agent and a helpful assistant. "
    "You can navigate websites, interact with elements, and take snapshots. "
    "Always take a snapshot first to understand the current page state before interacting. "
    "When the whole task given by user completes reply with a final summary."
    "Write concise, clear summaries that focus only on key results and important details, and never include reference tags or mentions like ref=e4 or @e4"
)