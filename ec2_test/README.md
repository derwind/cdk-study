# CDK TypeScript project for EC2

This is a project for starting EC2 inspired by [cm-tanaka-keisuke/developersio-cdk](https://github.com/cm-tanaka-keisuke/developersio-cdk).

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

## Dploying Stacks

### all

```sh
$ cdklocal deploy --all --path-metadata false
```

### each stack

For example,

```sh
$ cdklocal deploy IamStack --path-metadata false
```

## Starting EC2

First, check the instance ID with `aws ec2 describe-instances --endpoint-url=http://localhost:4566` and use that ID to start an instance with `aws ec2 start-instances --instance-ids i-8dce5bd75d1c64c40`.

For example,

```sh
$ aws ec2 describe-instances --endpoint-url=http://localhost:4566
{
    "Reservations": [
        {
            "Groups": [],
            "Instances": [
                {
                    "AmiLaunchIndex": 0,
                    "ImageId": "ami-08a8688fb7eacb171",
                    "InstanceId": "i-8dce5bd75d1c64c40",
```

Then,

```sh
$ aws ec2 start-instances --instance-ids i-8dce5bd75d1c64c40 --endpoint-url=http://localhost:4566
```

To stop the instance:

```sh
$ aws ec2 stop-instances --instance-ids i-8dce5bd75d1c64c40 --endpoint-url=http://localhost:4566
```
