import * as cdk from '@aws-cdk/core';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkSampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // サンプルLambda関数
    const lambda_func = new lambda.Function(this, "lambda_func", {
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset('lambda')
    })

    // イベントルール
    const scheduleRule = new events.Rule(this, "scheduleRule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "1", day: "1", month: "1", year: "2020" })
    })

    // イベントルールにpayload指定したLambda実行条件を追加
    scheduleRule.addTarget(new targets.LambdaFunction(lambda_func, {
      event: events.RuleTargetInput.fromObject({ Targets: [{ "Input": { "test": "sample_1" } }] })
    }))
    scheduleRule.addTarget(new targets.LambdaFunction(lambda_func, {
      event: events.RuleTargetInput.fromObject({ Targets: [{ "Input": { "test": "sample_2" } }] })
    }))
  }
}
