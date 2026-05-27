📌 Project Overview

This project is a Serverless To-Do List Web Application built using AWS cloud services.
The application allows users to add, view, update, and delete tasks without managing any servers.

🏗️ Architecture Flow
1. User accesses the frontend hosted in Amazon S3
2. Frontend sends API requests through API Gateway
3. API Gateway triggers AWS Lambda functions
4. Lambda functions perform CRUD operations
5. Data is stored in Amazon DynamoDB
6. CloudWatch monitors logs and errors

📂 Frontend Technologies
>> HTML
>> CSS
>> JavaScript

Frontend files were uploaded to an Amazon S3 bucket with Static Website Hosting enabled.

⚙️ Backend Technologies
>> Python
>> AWS Lambda
>> Boto3 SDK

Lambda functions were used to:

>> Add Tasks
>> Get Tasks
>> Update Tasks
>> Delete Tasks

🗄️ DynamoDB Table Structure

| Attribute | Description             |
| --------- | ----------------------- |
| taskId    | Unique ID for each task |
| taskName  | Name of the task        |
| status    | Task completion status  |

📊 Monitoring
Amazon CloudWatch was used to:

>> Monitor Lambda execution logs
>> Track task activity
>> Detect application errors
>> Troubleshoot backend issues

🔐 Security
>> IAM Roles were configured using the Principle of Least Privilege
>> API requests were securely handled using API Gateway

✅ Features
>> Fully Serverless Architecture
>> No Server Management
>> Scalable Application Design
>> Low Cost Pay-as-you-go Model
>> Real-time Monitoring with CloudWatch

# 🌐 Live Application

Frontend hosted using Amazon S3 Static Website Hosting:

🔗 http://student-task-manager-123.s3-website-us-east-1.amazonaws.com
