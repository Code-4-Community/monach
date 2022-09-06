import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import { CfnPlaceIndex } from 'aws-cdk-lib/aws-location';
import { PolicyStatement, Policy } from 'aws-cdk-lib/aws-iam';

export class Monarch extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new Table(this, 'MonarchTherapistTable', {
        partitionKey: { name: 'id', type: AttributeType.STRING },
        billingMode: BillingMode.PAY_PER_REQUEST,
    });

    const placeIndex = new CfnPlaceIndex(this, 'TherapistPlaceIndex', { dataSource: 'Esri', indexName: 'TherapistPlaceIndex' })

    const monarchMainFunction = new NodejsFunction(this, 'function', {
        environment: {
            TABLE_NAME: table.tableName,
            REGION: table.env.region,
            PLACE_INDEX_NAME: placeIndex.indexName
        }
    });

    table.grantFullAccess(monarchMainFunction.grantPrincipal)

    monarchMainFunction.role?.attachInlinePolicy(
        new Policy(this, 'aws-location-geocoding-policy',
          { statements: [
              new PolicyStatement({ actions: ['geo:SearchPlaceIndexForText'], resources: [placeIndex.attrArn, placeIndex.attrIndexArn]  })]})
    )

    const api = new LambdaRestApi(this, 'apigw', {
      handler: monarchMainFunction,
    });
    // TODO: throttle
    //api.addUsagePlan({})
  }
}
