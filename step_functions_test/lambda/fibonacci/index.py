def fibonacci(n_terms):
    terms = [1, 1]

    if n_terms < 2:
        return terms[:n_terms]

    for _ in range(n_terms - 2):
        num = terms[-2] + terms[-1]
        terms.append(num)
    return terms

def lambda_handler(event, context):
    n_terms = event['n_terms']

    event['fibonacci'] = fibonacci(n_terms)
    event['statusCode'] = 200

    return event

if __name__ == '__main__':
    for n_terms in range(7):
        print(fibonacci(n_terms))
