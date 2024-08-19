import json

def prepare_fine_tune_data(input_file, output_file):
    # Open the input file
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    fine_tune_data = []

    for entry in data:
        # Create a prompt-completion pair for the chosen response
        fine_tune_data.append({
            "prompt": entry["context"],
            "completion": entry["chosen"]
        })

    # Write the fine-tuning data to a new JSONL file
    with open(output_file, 'w') as out_file:
        for item in fine_tune_data:
            out_file.write(json.dumps(item) + '\n')

if __name__ == "__main__":
    # Specify the path to your JSON file and the output JSONL file
    input_file = './personal_finance_v0.2.json'
    output_file = './fine_tune_data.jsonl'

    # Prepare the data for fine-tuning
    prepare_fine_tune_data(input_file, output_file)
    print(f"Data formatted and saved to {output_file}")
