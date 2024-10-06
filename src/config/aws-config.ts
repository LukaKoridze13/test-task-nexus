import { config } from "dotenv";
import AWS from "aws-sdk";

config();

AWS.config.update({
  region: process.env.AWS_REGION,
});

export const s3 = new AWS.S3();
export const dynamoDB = new AWS.DynamoDB.DocumentClient();
