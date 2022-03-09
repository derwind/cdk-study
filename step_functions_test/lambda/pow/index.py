def pow(b, n):
    return b ** n

def lambda_handler(event, context):
    print(event)
    base = event['base']
    exponent = 1
    if 'exponent' in event:
        exponent = event['exponent']

    value = pow(base, exponent)

    return {
        'value': value,
        'statusCode': 200,
    }

if __name__ == '__main__':
    for base in range(3):
        for exponent in range(3):
            print(f'{base}^{exponent}={pow(base, exponent)}')
