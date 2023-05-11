const {createServer} = require('dynamodb-admin');
const awsConfigs = require('./config/aws-config.json');

function startDynamodb(AWS){
    process.env.DYNAMO_ENDPOINT=AWS.config.dynamodb.endpoint
    process.env.AWS_REGION=awsConfigs.region
    process.env.AWS_ACCESS_KEY_ID=awsConfigs.accessKeyId
    process.env.AWS_SECRET_ACCESS_KEY=awsConfigs.secretAccessKey1
    const dynamodb = new AWS.DynamoDB();
    const dynClient = new AWS.DynamoDB.DocumentClient({service: dynamodb});

    // console.log('aws endpoint', AWS.config.dynamodb.endpoint)
    // console.log('dynamodb endpoint', dynamodb.endpoint)
    // process.env.AWS_ACCESS_KEY_ID=

    const app = createServer(dynamodb, dynClient);
    const host = 'localhost';
    const port = 8001;
    const server = app.listen(port, host);
    server.on('listening', () => {
      console.log(`Aws Dynamodb-admin-ui on http://${host}:${port}`);
    });
}

module.exports.startDynamodb = startDynamodb;