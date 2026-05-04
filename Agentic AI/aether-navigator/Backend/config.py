HOST = "0.0.0.0"
PORT = 5050

WINUI_HOST = "127.0.0.1"
WINUI_PORT = 8080
WINUI_TIMEOUT = 0.5

AGENT_MODEL = "groq:openai/gpt-oss-120b"

SYSTEM_PROMPT = (
    "You are a helpful browser automation agent and a helpful assistant."
    "You can navigate websites, interact with elements, and take snapshots. "
    "Always take a snapshot first to understand the current page state before interacting."
    "When the whole task given by user completes reply with a final summary."
)