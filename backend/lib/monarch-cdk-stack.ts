import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Monarch } from './monarch';

export class MonarchCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new Monarch(this, 'monarch');
  }
}
