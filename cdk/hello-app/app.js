const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigwv2 = require("@aws-cdk/aws-apigatewayv2-alpha");
const apigwv2integrations = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");

const app = new cdk.App();
const stack = new cdk.Stack(app, "HelloStack");
const httpApi = new apigwv2.HttpApi(stack, 'HttpApi');
const httpApiEndpoint = new cdk.CfnOutput(stack, 'HttpApiEndpoint', {
      value: httpApi.apiEndpoint,
      description: 'The API Endpoint for this HTTP API',
      exportName: 'HelloApiEndpoint',
    })

const goFunc = new lambda.Function(stack, "GoFunc", {
   // TODO(dastbe): investigate why `bazel run :bin` runs in a distinct location
   // from  bazel build :assembly`
   code: lambda.Code.fromAsset(`${process.env.RUNFILES}/rules_cdk_example/go/hello-app/lambda.zip`, {}),
   runtime: lambda.Runtime.GO_1_X,
   handler: "hello-app-x86_64_linux",
});

const goFuncIntegration = new apigwv2integrations.HttpLambdaIntegration('GoFuncIntegration', goFunc);

httpApi.addRoutes({
  path: '/go',
  methods: [ apigwv2.HttpMethod.GET ],
  integration: goFuncIntegration,
});

const javaFunc = new lambda.Function(stack, "JavaFunc", {
   // TODO(dastbe): investigate why `bazel run :bin` runs in a distinct location
   // from  bazel build :assembly`
   code: lambda.Code.fromAsset(`${process.env.RUNFILES}/rules_cdk_example/java/hello-app/hello-app_deploy.jar`, {}),
   runtime: lambda.Runtime.JAVA_11,
   handler: "hello.Handler",
});

const javaFuncIntegration = new apigwv2integrations.HttpLambdaIntegration('JavaFuncIntegration', javaFunc);

httpApi.addRoutes({
  path: '/java',
  methods: [ apigwv2.HttpMethod.GET ],
  integration: javaFuncIntegration,
});

app.synth();
