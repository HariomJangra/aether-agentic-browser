from concurrent.futures import ThreadPoolExecutor

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from llm import generate_answer
from retrievers.text_retriever import retrieve_context
from retrievers.image_retriever import search_images
from retrievers.video_retriever import search_videos

app = FastAPI(title="Knowledge Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


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


@app.post("/ask", response_model=QueryResponse)
def ask(request: QueryRequest):
    """Accept a question, retrieve context, images, videos, and return everything."""
    q = request.query

    # Fetch text context + images + videos in parallel
    with ThreadPoolExecutor(max_workers=3) as executor:
        ctx_future = executor.submit(retrieve_context, q)
        img_future = executor.submit(search_images, q)
        vid_future = executor.submit(search_videos, q)

        retrieval = ctx_future.result()
        images_result = img_future.result()
        videos_result = vid_future.result()

    answer = generate_answer(q, retrieval["context"])

    return QueryResponse(
        query=q,
        answer=answer,
        sources=retrieval["sources"],
        images=images_result,
        videos=videos_result,
    )