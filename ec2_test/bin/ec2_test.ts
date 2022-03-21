#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Ec2TestStack } from '../lib/ec2_test-stack';

const app = new cdk.App();
new Ec2TestStack(app, 'Ec2TestStack', {
  env: { account: '000000000000', region: 'us-east-1' },
});
