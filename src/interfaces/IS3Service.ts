export interface IS3Service {
  uploadFile(key: string, body: Buffer): Promise<void>;
  deleteFile(key: string): Promise<void>;
}
