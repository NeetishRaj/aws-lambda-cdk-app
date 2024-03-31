import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const lambdaFunction = new lambda.Function(this, 'LambdaNodeStack', {
      code: lambda.Code.fromAsset('./src'),
      functionName: "lambdaCdkApp",
      handler: 'index.handler',
      memorySize: 1024, // 1GB
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(300),
    });

    const lambdaFunctionUrl = lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      invokeMode: lambda.InvokeMode.BUFFERED,
    });

    new cdk.CfnOutput(this, 'LambdaNodeUrl', {
      value: lambdaFunctionUrl.url,
    });
  }
}
