default_values = {
    'n_terms': 5,
    'exponent': 1
}

def lambda_handler(event, context):
    for k, v in default_values.items():
        if k not in event:
            event[k] = v

    event['statusCode'] = 200

    return event
