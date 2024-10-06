import { DynamoDBService } from "../src/services/DynamoDBService";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import logger from "../src/utils/logger";

jest.mock("../src/utils/logger");

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("DynamoDBService", () => {
  const dynamoDBService = new DynamoDBService();

  beforeEach(() => {
    ddbMock.reset();
  });

  it("should create an item successfully", async () => {
    ddbMock.on(PutCommand).resolves({});
    const item = {
      id: "1",
      createdAt: new Date().toISOString(),
      name: "Test Item",
      size: 100,
    };
    await expect(dynamoDBService.createItem(item)).resolves.toBeUndefined();
  });

  it("should get an item successfully", async () => {
    ddbMock
      .on(GetCommand)
      .resolves({ Item: { id: "test", name: "Test Item" } });
    const id = "test";
    await expect(dynamoDBService.getItem(id)).resolves.toEqual({
      id: "test",
      name: "Test Item",
    });
  });

  it("should update an item successfully", async () => {
    ddbMock.on(UpdateCommand).resolves({});
    const id = "test";
    const updates = { name: "Updated Test Item", size: 200 };
    await expect(
      dynamoDBService.updateItem(id, updates)
    ).resolves.toBeUndefined();
  });

  it("should delete an item successfully", async () => {
    ddbMock.on(DeleteCommand).resolves({});
    const id = "test";
    await expect(dynamoDBService.deleteItem(id)).resolves.toBeUndefined();
  });
});
