#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StepFunctionsTestStack } from '../lib/step_functions_test-stack';

const app = new cdk.App();
new StepFunctionsTestStack(app, 'StepFunctionsTestStack', {
});
