import subprocess
import threading
import json
from config import AGENT_MODEL
from cdp import get_active_tab as cdp_get_active_tab


# ── Helpers

def _run(cmd: str) -> str:
    """Run a shell command and return its output."""
    result = subprocess.run(
        cmd, shell=True, capture_output=True, encoding="utf-8", errors="replace"
    )
    return result.stdout + (result.stderr if result.returncode != 0 else "")


# ── Tools

def ensure_active_tab() -> str:
    cdp = cdp_get_active_tab()
    tabs_output = _run("agent-browser tab")

    active_title = cdp.get("active", {}).get("title", "")
    active_url = cdp.get("active", {}).get("url", "")

    matched_tab_id = None
    for line in tabs_output.splitlines():
        if active_url in line or active_title in line:
            # extract tab id like [t1]
            import re
            match = re.search(r"\[(t\d+)\]", line)
            if match:
                matched_tab_id = match.group(1)
                break

    if not matched_tab_id:
        return "Failed to match active tab."

    # check if already active
    if "→" in line:
        return f"Already on correct tab: {matched_tab_id}"

    return _run(f"agent-browser tab {matched_tab_id}")

# ── Agent singleton

'''
The agent is created once in a background thread so the server starts fast.

Server starts
   ↓
start_agent_init() → background thread starts
   ↓
Agent is loading...
   ↓
User request comes → get_agent()
   ↓
If agent ready → return instantly
If not → wait until ready
   ↓
Agent used
'''

_agent = None
_agent_ready = threading.Event()


def _init_agent():
    global _agent
    from langchain.agents import create_agent
    from langchain.tools import tool

    @tool("snapshot", description="Return interactive accessibility snapshot from agent-browser.")
    def snapshot() -> str:
        return _run("agent-browser snapshot -i")

    @tool(
        "navigate",
        description=(
            "Control browser navigation using agent-browser commands. "
            "Supported commands:\n"
            "- 'agent-browser open <url>' -> Navigate to a URL (aliases: goto, navigate)\n"
            "- 'agent-browser tab new <url>' -> Create New tab (url is optional)\n"
            "- 'agent-browser back' -> Go to previous page\n"
            "- 'agent-browser forward' -> Go to next page\n"
            "- 'agent-browser reload' -> Reload the current page\n"
            "Example: agent-browser open https://youtube.com\n"
            "Example: agent-browser tab new https://youtube.com"
        ),
    )
    def navigate(cmd: str) -> str:
        return _run(cmd)

    @tool(
        "interact",
        description=(
            "Interact with webpage elements using agent-browser commands. "
            "Mouse actions: 'agent-browser click <selector>' to click (--new-tab to open in new tab), "
            "'agent-browser dblclick <selector>' to double-click, "
            "'agent-browser hover <selector>' to hover, "
            "'agent-browser drag <source_selector> <target_selector>' to drag and drop. "
            "Text input: 'agent-browser fill <selector> <text>' to clear and fill input, "
            "'agent-browser type <selector> <text>' to type into element, "
            "'agent-browser keyboard type <text>' to type at current focus, "
            "'agent-browser keyboard inserttext <text>' to insert text without key events, "
            "'agent-browser upload <selector> <file_paths>' to upload files. "
            "Keyboard actions: 'agent-browser press <key>' to press a key (Enter, Tab, Control+a), "
            "'agent-browser keydown <key>' to hold key down, "
            "'agent-browser keyup <key>' to release key. "
            "Form controls: 'agent-browser focus <selector>' to focus element, "
            "'agent-browser select <selector> <value>' to select dropdown option, "
            "'agent-browser check <selector>' to check checkbox, "
            "'agent-browser uncheck <selector>' to uncheck checkbox. "
            "Scrolling: 'agent-browser scroll <direction> [pixels]' to scroll (up/down/left/right, optional --selector), "
            "'agent-browser scrollintoview <selector>' to scroll element into view. "
            "Selectors must use the ref format: @e4, @e12, etc. (NOT [ref=e4]). "
            "Example: agent-browser click @e4"
        )
    )
    def interact(cmd: str) -> str:
        return _run(cmd)

    _agent = create_agent(AGENT_MODEL, tools=[snapshot, navigate, interact])
    _agent_ready.set()


def start_agent_init():
    """Call this once at server startup to begin loading the agent."""
    threading.Thread(target=_init_agent, daemon=True).start()


def get_agent():
    """Block until the agent is ready, then return it."""
    _agent_ready.wait()
    return _agent

