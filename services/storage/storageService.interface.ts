export interface StorageService {
  addItem(file: File, userId: string): Promise<string>;
}