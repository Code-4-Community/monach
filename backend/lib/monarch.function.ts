import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';



// Create service client module using ES6 syntax.
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { LocationClient, SearchPlaceIndexForTextCommand  } from "@aws-sdk/client-location"
// Set the AWS Region.
const REGION = process.env.REGION; //e.g. "us-east-1"
const TABLE_NAME = process.env.TABLE_NAME
const INDEX_NAME = process.env.PLACE_INDEX_NAME
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: REGION });
const locationClient = new LocationClient({ region: REGION })

export { ddbClient, locationClient };
let cache = true;
export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const cacheAtInvokation = cache
/*
    if (cache) {
        try {
        await ddbClient.send(new PutItemCommand({
            TableName: TABLE_NAME,
            Item: {
                id: {S: 'test'},
                name: { S: "Richard Roe" },
            },
        }))
        } catch(err) {
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            }
        }
        cache = false;
    }


    //{"message":{"$metadata":{"httpStatusCode":200,"requestId":"2b1202d9-62fb-45e3-94ce-d76843224707","attempts":1,"totalRetryDelay":0},"Results":[{"Place":{"AddressNumber":"1625","Country":"USA","Geometry":{"Point":[-71.10354122291484,42.33393731635712]},"Interpolated":false,"Label":"1625 Tremont Street, Roxbury Crossing, MA, 02120, USA","Municipality":"Roxbury Crossing","Neighborhood":"Roxbury","PostalCode":"02120 1616","Region":"Massachusetts","Street":"Tremont Street","SubRegion":"Suffolk County"},"Relevance":1}],"Summary":{"DataSource":"Esri","FilterCountries":["USA"],"MaxResults":50,"ResultBBox":[-71.10354122291484,42.33393731635712,-71.10354122291484,42.33393731635712],"Text":"1625 Tremont St, Boston, MA 02120"}}}


    let message;
    try {
    message = await locationClient.send(new SearchPlaceIndexForTextCommand({
        IndexName: INDEX_NAME,
        Text: '1625 Tremont St, Boston, MA 02120',
        FilterCountries: ['USA'],
        MaxResults: 1
    }))


    } catch (e) {
        message = e;
    }
    */
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, world!",
        }),
    };
};
