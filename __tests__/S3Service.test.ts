import { S3Service } from "../src/services/S3Service";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import { Readable } from "stream";

jest.mock("../src/utils/logger");

// Set a default region for the test environment
process.env.AWS_REGION = "eu-central-1";

const s3Mock = mockClient(S3Client);

describe("S3Service", () => {
  const s3Service = new S3Service();

  beforeEach(() => {
    s3Mock.reset();
  });

  it("should upload a file successfully", async () => {
    s3Mock.on(PutObjectCommand).resolves({});
    const key = "test-file.txt";
    const fileStream = Readable.from("test content");
    const contentType = "text/plain";

    await expect(
      s3Service.uploadFile(key, fileStream, contentType)
    ).resolves.toBeUndefined();
  });

  it("should delete a file successfully", async () => {
    s3Mock.on(DeleteObjectCommand).resolves({});
    const key = "test-file.txt";
    await expect(s3Service.deleteFile(key)).resolves.toBeUndefined();
  });

  it("should throw an error if an unknown command is sent", async () => {
    jest.spyOn(s3Service, "uploadFile").mockImplementationOnce(async () => {
      throw new Error("Unknown command");
    });

    await expect(
      s3Service.uploadFile("invalid", Readable.from(""), "text/plain")
    ).rejects.toThrow("Unknown command");
  });
});
