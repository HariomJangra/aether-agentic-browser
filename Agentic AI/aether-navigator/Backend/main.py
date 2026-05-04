import subprocess
import uvicorn
from dotenv import load_dotenv

from app import create_app
from config import HOST, PORT
from utils import send_winui_signal

load_dotenv()

app = create_app()

if __name__ == "__main__":
    try:
        subprocess.Popen("agent-browser connect 9222", shell=True)
        uvicorn.run(app, host=HOST, port=PORT)
    finally:
        send_winui_signal("STOP")