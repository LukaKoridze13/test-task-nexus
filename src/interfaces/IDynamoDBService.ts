export interface IDynamoDBService {
  createRecord(id: string, name: string, size: number): Promise<void>;
  deleteRecord(id: string): Promise<void>;
  updateRecord(id: string, name?: string, size?: number): Promise<void>;
}
