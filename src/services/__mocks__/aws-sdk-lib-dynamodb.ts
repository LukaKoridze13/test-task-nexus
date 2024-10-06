import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// Mock the DynamoDBClient to return the mocked DynamoDBDocumentClient
export const DynamoDBClientMock = jest.fn(() => ({
  send: jest.fn().mockImplementation((command) => {
    if (command instanceof PutCommand) {
      return Promise.resolve({});
    } else if (command instanceof GetCommand) {
      return Promise.resolve({ Item: { id: "test", name: "Test Item" } });
    } else if (command instanceof UpdateCommand) {
      return Promise.resolve({});
    } else if (command instanceof DeleteCommand) {
      return Promise.resolve({});
    } else {
      return Promise.reject(new Error("Unknown command"));
    }
  }),
}));

jest.mock("@aws-sdk/lib-dynamodb", () => {
  return {
    DynamoDBDocumentClient: {
      from: jest.fn(() => new DynamoDBClientMock()),
    },
    PutCommand: jest.fn(),
    GetCommand: jest.fn(),
    UpdateCommand: jest.fn(),
    DeleteCommand: jest.fn(),
  };
});
