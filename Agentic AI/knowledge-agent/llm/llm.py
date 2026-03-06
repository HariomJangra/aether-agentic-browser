from langchain.chat_models import init_chat_model
from langchain.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv

load_dotenv()


def generate_answer(query: str, context: str) -> str:
    """Generate an answer using the LLM with retrieved context."""
    model = init_chat_model("groq:openai/gpt-oss-120b")
    conversation = [
        SystemMessage(
            "You are a helpful assistant. Use the context to answer the user question briefly."
        ),
        HumanMessage(
            f"User Question: {query}\n\nContext: {context}"
        ),
    ]
    return model.invoke(conversation).content