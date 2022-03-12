# CDK TypeScript project for Step Functions

This is a project for invoking Step Functions

## Development Environment

```
$ docker image ls | grep localstack
localstack/localstack       0.14.1              354d99d5680a        22 hours ago        1.5GB
```

```
$ npm list -g
/home/xxx/.nvm/versions/node/v16.13.2/lib
├── aws-cdk-local@2.14.0
├── aws-cdk@2.16.0
├── corepack@0.10.0
└── npm@8.5.3
```

```sh
$ aws --version
aws-cli/2.4.23 Python/3.8.8 Linux/5.4.0-1065-gcp exe/x86_64.ubuntu.18 prompt/off
```

## Invoking Step Functions

```sh
aws --endpoint-url=http://localhost:4566 stepfunctions start-execution --state-machine-arn "arn:aws:states:us-east-1:000000000000:stateMachine:FibonacciStateMachine"
```

In the following, `--endpoint-url` is omitted.

## Confirming States

For example,

```sh
aws stepfunctions describe-execution --execution-arn "arn:aws:states:us-east-1:000000000000:execution:FibonacciStateMachine:07070145-dd61-45cf-86e1-57086e75a74a"
```
