import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('students')

def lambda_handler(event, context):

    print("Event:", event)

    body = json.loads(event.get('body', '{}'))

    item = {
        'taskId': str(uuid.uuid4()),
        'name': body.get('name'),
        'rollNo': body.get('rollNo'),
        'course': body.get('course'),
        'status': 'Pending'
    }

    table.put_item(Item=item)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps({
            'message': 'Student added successfully',
            'taskId':item['taskId']
        })
    }