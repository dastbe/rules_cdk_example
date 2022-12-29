# Example Bazel CDK Application

## Overview

This repository implements a CDK application that deploys go and java handlers
behind an API gateway.

## Getting Started

In order to deploy this application you will need the following installed

* valid AWS credentials like you would use with the AWS CLI
* bazel or bazelisk (which we'll assume is aliased to bazel)

If you're already using [devbox](https://www.dev-box.app/) and/or
[direnv](https://direnv.net/), you can use those to automatically setup
bazelisk and the rest of the devtools for this repo.

If you've never installed a CDK app before, you'll like need to bootstrap your
account for it. You can do so in this repo by executing the following command

```
bazel run //:cdk_bootstrap -- 'aws://<your-account-id>/<your-region'
```

Which will deploy a bootstrap template in your AWS account. All of the
resources provisioned in this bootstrap template should be free.

## Deploying

To deploy, you can run

```
bazel run //cdk/hello-app:deploy
```

Which will build the go and java programs as well as the CDK cloud assembly,
then start deployment. It will prompt you to setup some IAM permissions that
handle authorizing API gateway to invoke your lambdas and apprunner services.

After the stack is deployed, you should see something like the following

```
Outputs:
HelloStack.HttpApiEndpoint = https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
```

In a browser you can query the following URLs

* `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/go\_lambda
* `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/java\_lambda`
* `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/java\_image

To invoke the respective handlers

## Cleaning Up

While these resources shouldn't cost anything if they aren't being invoked.
They are available on the public internet and so its best to tidy up once
you're done. You can do so by running

```
bazel run //cdk/hello-app:destroy
```

And confirming that you want to delete the stack.
