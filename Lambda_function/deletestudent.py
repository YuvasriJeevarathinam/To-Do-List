import json
import boto3

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('students')

def lambda_handler(event, context):

    body = json.loads(event.get('body', '{}'))

    taskId = body.get('taskId')

    table.delete_item(
        Key={
            'taskId': taskId
        }
    )
    print(event)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps({
            'message': 'Student deleted successfully'
        })
    }