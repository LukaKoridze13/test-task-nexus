import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  PutCommandInput,
  GetCommandInput,
  UpdateCommandInput,
  DeleteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import logger from "../utils/logger"; // Import the logger

export class DynamoDBService {
  private ddbClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor() {
    const clientConfig: DynamoDBClientConfig = {
      region: process.env.AWS_REGION,
    };
    const dynamoDBClient = new DynamoDBClient(clientConfig);
    this.ddbClient = DynamoDBDocumentClient.from(dynamoDBClient);
    this.tableName = process.env.DYNAMODB_TABLE_NAME!;
  }

  async createItem(item: Record<string, any>): Promise<void> {
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: item,
    };

    try {
      await this.ddbClient.send(new PutCommand(params));
      logger.info(`Item created successfully: ${JSON.stringify(item)}`);
    } catch (error) {
      logger.error(`Error creating item: ${JSON.stringify(item)} - ${error}`);
      throw error;
    }
  }

  async getItem(id: string): Promise<Record<string, any> | undefined> {
    const params: GetCommandInput = {
      TableName: this.tableName,
      Key: {
        Id: id,
      },
    };

    try {
      const result = await this.ddbClient.send(new GetCommand(params));
      logger.info(`Item retrieved successfully: ${id}`);
      return result.Item;
    } catch (error) {
      logger.error(`Error retrieving item: ${id} - ${error}`);
      throw error;
    }
  }

  async updateItem(id: string, updates: Record<string, any>): Promise<void> {
    const updateExpressions = [];
    const expressionAttributeValues: Record<string, any> = {};

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        updateExpressions.push(`${key} = :${key}`);
        expressionAttributeValues[`:${key}`] = updates[key];
      }
    }

    const params: UpdateCommandInput = {
      TableName: this.tableName,
      Key: {
        Id: id,
      },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    try {
      await this.ddbClient.send(new UpdateCommand(params));
      logger.info(`Item updated successfully: ${id}`);
    } catch (error) {
      logger.error(`Error updating item: ${id} - ${error}`);
      throw error;
    }
  }

  async deleteItem(id: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.tableName,
      Key: {
        Id: id,
      },
    };

    try {
      await this.ddbClient.send(new DeleteCommand(params));
      logger.info(`Item deleted successfully: ${id}`);
    } catch (error) {
      logger.error(`Error deleting item: ${id} - ${error}`);
      throw error;
    }
  }
}
