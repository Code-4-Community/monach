// Load Environment Variables from .env
import * as dotenv from 'dotenv'
dotenv.config()

import { DynamoDBClient, BatchExecuteStatementCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


// TODO: Write persitence level test using local DB
// This is kind of a pain, and a "slow" test so we elide it
export async function scanAllPractitioners() {
  const command = new ScanCommand({ TableName: "Practitioners", })
  const dynamoRawResult = await client.send(command)
  const unmarshalledItems = dynamoRawResult.Items.map(unmarshall)
  console.log(JSON.stringify(unmarshalledItems, null, 2))
  return unmarshalledItems
}
