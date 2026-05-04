"""
FastAPI backend for the Search Agent.
Streams agent thought/tool steps via Server-Sent Events (SSE).
"""

import json
import sys
import os
import threading
import uvicorn
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

_t0 = time.time()
def _time_check(name):
    global _t0
    t1 = time.time()
    print(f"\033[96m  [SERVER STARTUP] {name} took {t1 - _t0:.3f}s\033[0m")
    _t0 = t1

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

import warnings
warnings.filterwarnings("ignore", message="Core Pydantic V1 functionality")
_time_check("FastAPI & Standard Imports")


# ── load .env (GROQ_API_KEY etc.)
load_dotenv()

# ── absolute path so imports resolve regardless of cwd
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# ── Stop flag
_stop_event = threading.Event()

# ── LangChain internals (lazy loaded in background)
agent = None
memory = None

def init_langchain():
    global agent, memory
    if agent is not None:
        return

    import time
    t0_lc = time.time()
    
    from langchain.agents import create_agent
    from langchain.tools import tool
    from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
    
    from retrievers.text_retriever import retrieve_context
    from retrievers.image_retriever import search_images
    from retrievers.video_retriever import search_videos

    @tool(
        "web_search",
        description=(
            "Search the web for information on a given query. "
            "Returns relevant text context and source URLs. "
            "Use this to find factual information to answer user questions."
        ),
    )
    def web_search(query: str) -> str:
        retrieval = retrieve_context(query)
        sources = retrieval["sources"]
        context = retrieval["context"]
        source_list = "\n".join(
            f"- {s['title']}: {s['url']}" for s in sources
        )
        return f"Context:\n{context}\n\nSources:\n{source_list}"

    @tool(
        "image_search",
        description=(
            "Search the web for images related to a given query. "
            "Returns a list of image titles and URLs. "
            "Use this when the user asks for images or visual content."
        ),
    )
    def image_search(query: str) -> str:
        images = search_images(query)
        if not images:
            return "No images found."
        results = "\n".join(
            f"- {img['title']}: {img['image']}" for img in images
        )
        return f"Images found:\n{results}"

    @tool(
        "video_search",
        description=(
            "Search the web for videos related to a given query. "
            "Returns a list of video titles, URLs, and descriptions. "
            "Use this when the user asks for videos or video content."
        ),
    )
    def video_search(query: str) -> str:
        videos = search_videos(query)
        if not videos:
            return "No videos found."
        results = "\n".join(
            f"- {v['title']} ({v['duration']}): {v['url']}" for v in videos
        )
        return f"Videos found:\n{results}"

    # ── System prompt & memory
    SYSTEM_PROMPT = (
        "You are a helpful search assistant. "
        "You can search the web for text, images, and videos to answer user queries. "
        "Always use the web_search tool to find relevant information before answering. "
        "Use image_search and video_search when the user requests visual or video content. "
        "Provide concise, well-structured answers based on the retrieved context."
    )

    class ConversationMemory:
        def __init__(self, system_prompt: str = SYSTEM_PROMPT):
            self.history = [SystemMessage(content=system_prompt)]

        def add(self, role: str, content: str):
            if role == "user":
                self.history.append(HumanMessage(content=content))
            else:
                self.history.append(AIMessage(content=content))

        def get(self):
            return self.history

        def clear(self):
            self.history = [self.history[0]]

    memory = ConversationMemory()

    # ── Agent
    agent = create_agent("groq:openai/gpt-oss-120b", tools=[web_search, image_search, video_search])

    t1_lc = time.time()
    print(f"\n\033[96m⏱️  [BACKGROUND INIT] LangChain & Agent ready in {t1_lc - t0_lc:.3f}s\033[0m")


# ── FastAPI app
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
_time_check("FastAPI App Setup")

@app.on_event("startup")
async def startup_event():
    # Start Langchain initialization in a background thread
    threading.Thread(target=init_langchain, daemon=True).start()


class ChatRequest(BaseModel):
    message: str


class QueryRequest(BaseModel):
    query: str


class Source(BaseModel):
    title: str
    url: str
    body: str


class Image(BaseModel):
    title: str
    image: str
    thumbnail: str


class Video(BaseModel):
    title: str
    url: str
    description: str
    publisher: str
    duration: str
    thumbnail: str


class QueryResponse(BaseModel):
    query: str
    answer: str
    sources: list[Source]
    images: list[Image]
    videos: list[Video]


def event(payload: dict) -> str:
    """Format a dict as a single SSE data line."""
    return f"data: {json.dumps(payload)}\n\n"


def stream_chat(user_input: str):
    """Generator: yields SSE events while the agent is running."""
    # Wait for background init to finish if it hasn't
    while agent is None or memory is None:
        time.sleep(0.1)

    _stop_event.clear()
    memory.add("user", user_input)

    ai_reply = ""

    try:
        for step in agent.stream({"messages": memory.get()}, stream_mode="updates"):
            if _stop_event.is_set():
                yield event({"type": "stopped", "content": "Task stopped by user."})
                break
            for node, update in step.items():
                for msg in update.get("messages", []):
                    if hasattr(msg, "tool_calls") and msg.tool_calls:
                        for tc in msg.tool_calls:
                            yield event({
                                "type": "tool_call",
                                "name": tc["name"],
                                "args": tc["args"],
                            })

                    elif hasattr(msg, "name") and msg.name:
                        preview = (msg.content or "")[:400].replace("\n", " ")
                        yield event({
                            "type": "tool_result",
                            "name": msg.name,
                            "preview": preview,
                        })

                    elif hasattr(msg, "content") and msg.content:
                        ai_reply = msg.content
                        yield event({"type": "ai_message", "content": ai_reply})

    except Exception as exc:
        yield event({"type": "error", "content": str(exc)})

    memory.add("ai", ai_reply)
    yield event({"type": "done"})


# ── Routes
@app.post("/ask", response_model=QueryResponse)
def ask_endpoint(request: QueryRequest):
    """Accept a question, retrieve context, images, videos, and return everything."""
    from langchain.chat_models import init_chat_model
    from langchain_core.messages import HumanMessage, SystemMessage
    from retrievers.text_retriever import retrieve_context
    from retrievers.image_retriever import search_images
    from retrievers.video_retriever import search_videos

    q = request.query

    with ThreadPoolExecutor(max_workers=3) as executor:
        ctx_future = executor.submit(retrieve_context, q)
        img_future = executor.submit(search_images, q)
        vid_future = executor.submit(search_videos, q)

        retrieval = ctx_future.result()
        images_result = img_future.result()
        videos_result = vid_future.result()

    model = init_chat_model("groq:openai/gpt-oss-120b")
    conversation = [
        SystemMessage(content="You are a helpful assistant. Use the context to answer the user question briefly."),
        HumanMessage(content=f"User Question: {q}\n\nContext: {retrieval['context']}"),
    ]
    answer = model.invoke(conversation).content

    return QueryResponse(
        query=q,
        answer=answer,
        sources=retrieval["sources"],
        images=images_result,
        videos=videos_result,
    )


@app.post("/chat")
async def chat_endpoint(body: ChatRequest):
    user_input = body.message.strip()
    if not user_input:
        return {"error": "Empty message"}

    return StreamingResponse(
        stream_chat(user_input),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Serve React frontend (built with `npm run build`)
_frontend_dist = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if _frontend_dist.is_dir():
    app.mount("/assets", StaticFiles(directory=_frontend_dist / "assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file = _frontend_dist / full_path
        if file.is_file():
            return FileResponse(file)
        return FileResponse(_frontend_dist / "index.html")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
