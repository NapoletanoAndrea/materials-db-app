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


def analyze_image(image_bytes: bytes) -> tuple:
    client = get_client()

    prompt = """
    Analyze this image and respond **ONLY** in valid JSON with the following keys:

    - "name": a single word or short phrase describing the main subject (e.g., "Dog").
    - "description": a concise sentence describing what is happening in the image.
    - "condition": one of the following values describing the item's physical condition: "bad", "decent", "good", or "as_new".
    - "height": the height of the item in millimeters (mm).
    - "width": the width of the item in millimeters (mm).
    - "depth": the depth of the item in millimeters (mm).
    - "weight": the weight of the item in grams (g).

    If a 75x75x75 mm cube is visible in the image, use it as a reference to estimate the item's dimensions accurately.
    If no cube is visible, set "height", "width", and "depth" to 0.
    Don't mention the background or the cube (if present) in the name or description.

    Ensure the output is valid JSON and does not include any extra text or formatting.
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

    return result, response.usage_metadata.total_token_count
