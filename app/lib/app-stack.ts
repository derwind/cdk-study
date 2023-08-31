import * as cdk from 'aws-cdk-lib';
import {
  aws_iam as iam,
  aws_lambda as lambda,
  aws_apigateway as apigw,
  aws_s3 as s3,
  // aws_s3_deployment as s3deploy
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  PythonFunction
} from '@aws-cdk/aws-lambda-python-alpha';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const testLambdaRole = new iam.Role(this, "TestLambdaRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    testLambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );

    const showTableLambda = new PythonFunction(this, "ShowTablesLambda", {
      functionName: "ShowTables",
      runtime: lambda.Runtime.PYTHON_3_10,
      architecture: lambda.Architecture.X86_64,
      entry: "lambda/show_tables",
      environment: {
        DB_HOST: "mysql", // docker
        DB_PORT: "3306",
        DB_USER: "test_admin",
        DB_NAME: "test_db",
        DB_PASS: "test_admin",
        DB_TABLE: "test_table",
      },
      role: testLambdaRole,
    });

    const registerDataLambda = new PythonFunction(this, "RegisterDataLambda", {
      functionName: "RegisterData",
      runtime: lambda.Runtime.PYTHON_3_10,
      architecture: lambda.Architecture.X86_64,
      entry: "lambda/register_data",
      environment: {
        DB_HOST: "mysql", // docker
        DB_PORT: "3306",
        DB_USER: "test_admin",
        DB_NAME: "test_db",
        DB_PASS: "test_admin",
        DB_TABLE: "test_table",
      },
      role: testLambdaRole,
    });

    const testApiGW = new apigw.LambdaRestApi(this, "TestApiGW", {
      handler: new lambda.Function(this, "TestRootLambda", {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "index.handler",
        code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('event: ', event);
          return {
            statusCode: 200,
            body: JSON.stringify({"event": event}),
          };
        };
        `),
        role: testLambdaRole,
      }),
      proxy: false,
    });
    const data = testApiGW.root.addResource("data", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      },
    });
    data.addMethod("GET", new apigw.LambdaIntegration(showTableLambda));
    data.addMethod("POST", new apigw.LambdaIntegration(registerDataLambda));

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    // new s3deploy.BucketDeployment(this, "DeployWebsite", {
    //   sources: [s3deploy.Source.asset("./website-dist")],
    //   destinationBucket: websiteBucket,
    //   destinationKeyPrefix: "web/static", // optional prefix in destination bucket
    // });

    new cdk.CfnOutput(this, "S3WebSite", {
      value: websiteBucket.bucketWebsiteUrl,
    });
  }
}
