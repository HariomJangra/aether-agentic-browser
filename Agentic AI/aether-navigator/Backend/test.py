import os
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv

load_dotenv()

os.getenv("GEMINI_API_KEY")

model = init_chat_model("gemma-4-31b-it", model_provider="google-genai")

response = model.invoke("Hi!")
print(response)