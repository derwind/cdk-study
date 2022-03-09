import boto3
import json
import time

def main():
    input = {
        'n_terms': 7,
        'exponent': 2
    }

    client = boto3.client('stepfunctions', endpoint_url='http://localhost:4566/')
    response = client.start_execution(input=json.dumps(input), stateMachineArn='arn:aws:states:us-east-1:000000000000:stateMachine:FibonacciStateMachine')

    max_try = 10
    for _ in range(max_try):
        response = client.describe_execution(executionArn=response['executionArn'])
        if response['status'] != 'RUNNING':
            print(response)
            break
        else:
            time.sleep(1)

if __name__ == '__main__':
    main()
