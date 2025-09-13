# ai_core/services.py
import json
from google.genai import types
from google import genai

_client = None


def get_client():
    global _client
    if _client is None:
        _client = genai.Client()
    return _client


def analyze_image(image_url: str) -> dict:
    client = get_client()

    with open(image_url, 'rb') as f:
        image_bytes = f.read()

    prompt = """
    Analyze this image and respond ONLY in valid JSON with two keys:
    - "name": a single word or a few words naming the main subject (e.g., "Dog")
    - "description": a short sentence describing what is happening in the image
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type='image/jpeg',
            ),
            prompt
        ]
    )

    # Extract text and parse into Python dict
    json_str = response.text.strip()

    try:
        result = json.loads(json_str)
    except json.JSONDecodeError:
        # If Gemini adds extra text, try to extract JSON manually
        start = json_str.find("{")
        end = json_str.rfind("}")
        result = json.loads(json_str[start:end + 1])

    return result
