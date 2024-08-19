import openai
import os

openai.api_key = os.getenv("NEXT_PUBLIC_OPENAI_API_KEY")

# Upload the training file
with open("fine_tune_data.jsonl", "rb") as f:
    response = openai.File.create(file=f, purpose="fine-tune")

training_file_id = response["id"]
print(f"Uploaded file ID: {training_file_id}")
