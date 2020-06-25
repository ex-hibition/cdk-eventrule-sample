import json

def lambda_handler(event, context):
    output = event['test']
    print(json.dumps(output))
    return json.dumps(output)

if __name__ == "__main__":
    event = {"test": "sample"}
    lambda_handler(event, "")