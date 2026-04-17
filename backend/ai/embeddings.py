import google.generativeai as genai
import numpy as np
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def get_embedding(text: str):
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text
    )
    return np.array(result["embedding"])


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))