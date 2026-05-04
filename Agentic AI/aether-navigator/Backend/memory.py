import threading
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from config import SYSTEM_PROMPT


class ConversationMemory:
    """Holds the chat history for one browser-tab session."""

    def __init__(self):
        self._history = [SystemMessage(content=SYSTEM_PROMPT)]

    def add(self, role: str, content: str):
        if role == "user":
            self._history.append(HumanMessage(content=content))
        elif role == "ai":
            self._history.append(AIMessage(content=content))

    def get(self) -> list:
        return self._history

    def clear(self):
        # Keep the system message, drop everything else
        self._history = [self._history[0]]

    def length(self) -> int:
        return len(self._history)


class SessionManager:
    """
    Keeps one ConversationMemory and one stop-Event per session_id.
    session_id is a UUID generated per browser tab on the frontend.
    """

    def __init__(self):
        self._memories: dict[str, ConversationMemory] = {}
        self._stop_events: dict[str, threading.Event] = {}

    def _ensure(self, session_id: str):
        """Create memory + stop-event for a session if they don't exist yet."""
        if session_id not in self._memories:
            self._memories[session_id] = ConversationMemory()
        if session_id not in self._stop_events:
            self._stop_events[session_id] = threading.Event()

    def get_memory(self, session_id: str) -> ConversationMemory:
        self._ensure(session_id)
        return self._memories[session_id]

    def get_stop_event(self, session_id: str) -> threading.Event:
        self._ensure(session_id)
        return self._stop_events[session_id]

    def clear_memory(self, session_id: str):
        if session_id in self._memories:
            self._memories[session_id].clear()

    def request_stop(self, session_id: str):
        self._ensure(session_id)
        self._stop_events[session_id].set()


# One shared instance used by the whole app
session_manager = SessionManager()