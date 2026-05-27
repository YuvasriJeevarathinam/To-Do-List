import json
import boto3

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('students')


def lambda_handler(event, context):

    try:
        
        body = json.loads(event.get('body', '{}'))

        taskId = body.get('taskId')

        if not taskId:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'taskId is required'
                })
            }

        table.update_item(
            Key={
                'taskId': taskId
            },
            UpdateExpression='SET #s = :val',
            ExpressionAttributeNames={
                '#s': 'status'
            },
            ExpressionAttributeValues={
                ':val': 'Completed'
            }
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({
                'message': 'Student marked as Completed'
            })
        }

    except Exception as e:

        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e)
            })
        }
