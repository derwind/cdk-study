# CDK TypeScript project for Lambda

This is a project for invoking Lambda

## Development Environment

```
$ docker image ls | grep localstack
localstack/localstack       0.12.20             9636a7470495        4 months ago        833MB
```

```
$ npm list -g
/home/xxx/.nvm/versions/node/v16.13.2/lib
├── aws-cdk-local@2.14.0
├── aws-cdk@2.15.0
├── corepack@0.10.0
└── npm@8.5.3
```

```sh
$ aws --version
aws-cli/2.4.23 Python/3.8.8 Linux/5.4.0-1065-gcp exe/x86_64.ubuntu.18 prompt/off
```

## Invoking Lambda

### Without payloads

```sh
aws --endpoint-url=http://localhost:4566 lambda invoke --function-name Hello response.json
```

In the following, `--endpoint-url` is omitted.

### With payloads

```sh
aws lambda invoke --function-name Hello --payload $(echo '{ "message": "World" }' | base64) response.json
```

## Confirming CloudWatch Logs

### To describe log groups

```sh
aws logs describe-log-groups
```

### To describe log streams

For example,

```sh
aws logs describe-log-streams --log-group-name "/aws/lambda/Hello"
```

### To get log events

For example,

```sh
aws logs get-log-events --log-group-name "/aws/lambda/Hello" --log-stream-name "2022/03/05/[LATEST]8538bf48"
```
