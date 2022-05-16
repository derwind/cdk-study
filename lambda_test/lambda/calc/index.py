import numpy as np

def handler(event, context):
    x = event['x']
    result = np.exp(x)
    print(f'result={result}')

    return {
        'statusCode': 200,
    }
