import {
  Stack,
  StackProps,
  aws_lambda as lambda
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-lambda-python-alpha-readme.html
import {
  PythonFunction,
  PythonLayerVersion
} from '@aws-cdk/aws-lambda-python-alpha';

export class LambdaTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new PythonFunction(this, 'CalcLambda', {
      functionName: 'Calc',
      runtime: lambda.Runtime.PYTHON_3_7,
      architecture: lambda.Architecture.X86_64,
      entry: 'lambda/calc',
      layers: [
        new PythonLayerVersion(this, 'PythonLayer', {
          entry: 'lambda/calc'
        }),
      ],
    });
  }
}
