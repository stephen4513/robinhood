from dotenv import load_dotenv
import openai 
import os
import time

load_dotenv()
openai.api_key = os.getenv("NEXT_PUBLIC_OPENAI_API_KEY")

def fine_tune_model(training_file_id):
    # Create a fine-tune job with the given file ID
    response = openai.fine_tuning.jobs.create(
        training_file=training_file_id,
        model="gpt-3.5-turbo",
        suffix="checkpointed"  # Optional: Add suffix for model name
    )

    fine_tune_id = response['id']
    print(f"Fine-tuning started. Job ID: {fine_tune_id}")

    # Poll the status of the fine-tune job
    while True:
        # Retrieve the fine-tune job's status
        status_response = openai.fine_tuning.jobs.retrieve(fine_tune_id)
        status = status_response['status']
        
        if status == 'succeeded':
            model_id = status_response['fine_tuned_model']
            print(f"Fine-tuning completed. Model ID: {model_id}")
            return model_id
        elif status == 'failed':
            print("Fine-tuning failed.")
            return None
        print(f"Fine-tuning status: {status}. Waiting...")
        time.sleep(60)  # Check every 60 seconds

if __name__ == "__main__":
    # Specify the ID of your uploaded JSONL file
    training_file_id = "file-abc123"  # Replace with your actual file ID

    # Fine-tune the model and get the model ID
    model_id = fine_tune_model(training_file_id)

    if model_id:
        print(f"Model ID: {model_id}")
    else:
        print("Fine-tuning did not succeed.")
