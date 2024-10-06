import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const S3ClientMock = jest.fn(() => ({
  send: jest.fn().mockImplementation((command) => {
    if (command instanceof PutObjectCommand) {
      return Promise.resolve({}); // Simulate successful upload
    } else if (command instanceof DeleteObjectCommand) {
      return Promise.resolve({}); // Simulate successful deletion
    } else {
      return Promise.reject(new Error("Unknown command"));
    }
  }),
}));

jest.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: S3ClientMock,
    PutObjectCommand: jest.fn(),
    DeleteObjectCommand: jest.fn(),
  };
});
