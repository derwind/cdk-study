import {
  Stack,
  StackProps,
  Duration,
  aws_lambda as lambda,
  aws_stepfunctions as sfn,
  aws_stepfunctions_tasks as tasks
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StepFunctionsTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.newStateMachine();
  }

  // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions-readme.html
  private newStateMachine(): sfn.StateMachine {
    const defaultValuesLambda = new lambda.Function(this, 'Default values', {
      functionName: 'DefaultValues',
      runtime: lambda.Runtime.PYTHON_3_9,
      architecture: lambda.Architecture.X86_64,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('./lambda/default_values'),
      timeout: Duration.seconds(3)
    });

    const fibonacciLambda = new lambda.Function(this, 'Fibonacci', {
      functionName: 'Fibonacci',
      runtime: lambda.Runtime.PYTHON_3_9,
      architecture: lambda.Architecture.X86_64,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('./lambda/fibonacci'),
      timeout: Duration.seconds(3)
    });

    const powLambda = new lambda.Function(this, 'Pow', {
      functionName: 'Pow',
      runtime: lambda.Runtime.PYTHON_3_9,
      architecture: lambda.Architecture.X86_64,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('./lambda/pow'),
      timeout: Duration.seconds(3)
    });

    const submitJob = new tasks.LambdaInvoke(this, 'Submit Job', {
      lambdaFunction: defaultValuesLambda,
      outputPath: '$.Payload',
    }).addRetry({ maxAttempts: 1 });

    const fibonacciJob = new tasks.LambdaInvoke(this, 'Fibonacci Job', {
      lambdaFunction: fibonacciLambda,
      outputPath: '$.Payload',
    }).addRetry({ maxAttempts: 1 });

    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions.Map.html
    const map = new sfn.Map(this, 'Map State', {
      itemsPath: sfn.JsonPath.stringAt('$.fibonacci'),
      parameters: {
        'base.$': '$$.Map.Item.Value',
        'exponent.$': '$.exponent',
      },
    }).addRetry({ maxAttempts: 1 });

    const powJob = new tasks.LambdaInvoke(this, 'Power Job', {
      lambdaFunction: powLambda,
      inputPath: '$',
      outputPath: '$.Payload',
    }).addRetry({ maxAttempts: 1 });

    map.iterator(powJob);

    const definition = submitJob
      .next(fibonacciJob)
      .next(map);

    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions.StateMachine.html
    const stateMachine = new sfn.StateMachine(this, 'FibonacciStateMachine', {
      stateMachineName: 'FibonacciStateMachine',
      definition: definition,
      timeout: Duration.seconds(30)
    });

    return stateMachine;
  }
}
