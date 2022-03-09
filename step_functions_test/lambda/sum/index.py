def lambda_handler(event, context):
    # event = [{'base': 1, 'exponent': 2, 'statusCode': 200, 'value': 1}, {'base': 1, 'exponent': 2, 'statusCode': 200, 'value': 1}, ...]
    total = 0
    for eve in event:
        total += eve['value']

    event = {}
    event['value'] = total
    event['statusCode'] = 200

    return event
