def pow(b, n):
    return b ** n

def lambda_handler(event, context):
    base = event['base']
    exponent = event['exponent']

    event['value'] = pow(base, exponent)
    event['statusCode'] = 200

    return event

if __name__ == '__main__':
    for base in range(3):
        for exponent in range(3):
            print(f'{base}^{exponent}={pow(base, exponent)}')
