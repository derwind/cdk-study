import {
  Stack,
  StackProps,
  Duration,
  aws_lambda as lambda
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class LambdaTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'HelloLambda', {
      functionName: 'Hello',
      runtime: lambda.Runtime.PYTHON_3_9,
      architecture: lambda.Architecture.X86_64,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('./lambda/hello'),
      timeout: Duration.seconds(30)
    });
  }
}
