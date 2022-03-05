# CDK TypeScript project for Lambda

This is a project for invoking Lambda

## Development Environment

```
$ pip list | grep localstack
localstack               0.14.0.8
localstack-client        1.32
localstack-ext           0.14.0.23
localstack-plugin-loader 1.1.1
```

```
$ npm list -g
/home/xxx/.nvm/versions/node/v16.13.2/lib
├── aws-cdk-local@2.14.0
├── aws-cdk@2.15.0
├── corepack@0.10.0
└── npm@8.5.3
```

## Invoking Lambda

### Without payloads

```sh
awslocal lambda invoke --function-name Hello response.json
```

### With payloads

```sh
awslocal lambda invoke --function-name Hello --payload '{ "message": "World" }' response.json
```

## Confirming CloudWatch Logs

### To describe log groups

```sh
awslocal logs describe-log-groups
```

### To describe log streams

For example,

```sh
awslocal logs describe-log-streams --log-group-name "/aws/lambda/Hello"
```

### To get log events

For example,

```sh
awslocal logs get-log-events --log-group-name "/aws/lambda/Hello" --log-stream-name "2022/03/05/[LATEST]8538bf48"
```
