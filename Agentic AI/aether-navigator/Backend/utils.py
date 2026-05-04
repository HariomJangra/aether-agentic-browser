import json
import socket
from config import WINUI_HOST, WINUI_PORT, WINUI_TIMEOUT


def send_winui_signal(signal: str):
    """Ping the WinUI3 native app with a short signal string (e.g. 'START' or 'STOP')."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(WINUI_TIMEOUT)
            s.connect((WINUI_HOST, WINUI_PORT))
            s.sendall(signal.encode("utf-8"))
    except (ConnectionRefusedError, socket.timeout):
        print(f"WinUI3 app not found. Signal '{signal}' not sent.")
    except Exception as e:
        print(f"Error signaling WinUI: {e}")


def sse_event(payload: dict) -> str:
    """Format a dict as a Server-Sent Event string."""
    return f"data: {json.dumps(payload)}\n\n"