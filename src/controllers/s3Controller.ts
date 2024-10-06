import { Request, Response } from "express";
import { S3Service } from "../services/S3Service";
import { DynamoDBService } from "../services/DynamoDBService";
import { Readable } from "stream";

const s3Service = new S3Service();
const dynamoDBService = new DynamoDBService();

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const { originalname, mimetype, buffer } = req.file;
  const key = originalname;

  try {
    // Upload file to S3
    await s3Service.uploadFile(key, Readable.from(buffer), mimetype);

    // Create record in DynamoDB
    const item = {
      Id: key,
      createdAt: new Date().toISOString(),
      name: key,
      size: buffer.length,
    };
    await dynamoDBService.createItem(item);

    res.status(200).send("File uploaded and record created successfully.");
  } catch (error) {
    res.status(500).send(`Error during upload and record creation: ${error}`);
  }
};

export const updateFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { key } = req.params;

  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const { mimetype, buffer } = req.file;

  try {
    // Update file in S3
    await s3Service.uploadFile(key, Readable.from(buffer), mimetype);

    // Update record in DynamoDB
    const updates = {
      size: buffer.length,
      updatedAt: new Date().toISOString(),
    };
    await dynamoDBService.updateItem(key, updates);

    res.status(200).send("File and record updated successfully.");
  } catch (error) {
    res.status(500).send(`Error during update: ${error}`);
  }
};

export const deleteFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { key } = req.params;

  try {
    // Delete file from S3
    await s3Service.deleteFile(key);

    // Delete record from DynamoDB
    await dynamoDBService.deleteItem(key);

    res.status(200).send("File and record deleted successfully.");
  } catch (error) {
    res.status(500).send(`Error during deletion: ${error}`);
  }
};
