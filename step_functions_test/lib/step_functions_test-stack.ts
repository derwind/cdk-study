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
    const submitLambda = new lambda.Function(this, 'Fibonacci', {
      functionName: 'Fibonacci',
      runtime: lambda.Runtime.PYTHON_3_9,
      architecture: lambda.Architecture.X86_64,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('./lambda/fibonacci'),
      timeout: Duration.seconds(30)
    });

    const submitJob = new tasks.LambdaInvoke(this, 'Submit Job', {
      lambdaFunction: submitLambda,
      outputPath: '$.Payload',
    });

    const definition = submitJob;

    const stateMachine = new sfn.StateMachine(this, 'FibonacciStateMachine', {
        definition: definition,
        timeout: Duration.seconds(60)
    });

    return stateMachine;
  }
}
