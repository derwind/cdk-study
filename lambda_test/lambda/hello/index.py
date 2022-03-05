def lambda_handler(event, context):
    if 'message' in event:
        print(f'Hello, {event["message"]}')
    else:
        print(f'Hello, wo...')
    return {
        'statusCode': 200,
    }
