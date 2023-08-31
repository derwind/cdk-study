#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';

const {
  CDK_DEFAULT_ACCOUNT = '0000000000',
  CDK_DEFAULT_REGION = 'us-east-1',
} = process.env;

const app = new cdk.App();
new AppStack(app, 'AppStack', {
  env: { account: CDK_DEFAULT_ACCOUNT, region: CDK_DEFAULT_REGION }
});
