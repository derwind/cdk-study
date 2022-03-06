def fibonacci(n_terms):
    terms = [1, 1]

    if n_terms < 2:
        return terms[:n_terms]

    for _ in range(n_terms - 2):
        num = terms[-2] + terms[-1]
        terms.append(num)
    return terms

def lambda_handler(event, context):
    n_terms = 5
    if 'n_terms' in event:
        n_terms = event['n_terms']

    return {
        'fibonacci': fibonacci(n_terms),
        'statusCode': 200,
    }

if __name__ == '__main__':
    for n_terms in range(7):
        print(fibonacci(n_terms))
