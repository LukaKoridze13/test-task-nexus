import {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";
import logger from "../utils/logger";

export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });
    this.bucketName = process.env.BUCKET_NAME!;
  }

  // Method to upload a file to S3 using @aws-sdk/lib-storage
  async uploadFile(
    key: string,
    fileStream: Readable,
    contentType: string
  ): Promise<void> {
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: fileStream,
          ContentType: contentType,
        },
      });

      await upload.done();
      logger.info(`File uploaded successfully: ${key}`);
    } catch (error) {
      logger.error(`Error uploading file: ${key} - ${error}`);
      throw error;
    }
  }

  // Method to delete a file from S3
  async deleteFile(key: string): Promise<void> {
    const params: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
      logger.info(`File deleted successfully: ${key}`);
    } catch (error) {
      logger.error(`Error deleting file: ${key} - ${error}`);
      throw error;
    }
  }
}
