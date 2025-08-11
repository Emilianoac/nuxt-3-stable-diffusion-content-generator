
export interface LocalStorageService {
  setItem(key: string, value: string) : void;
  getItem(key: string): string | null;
  clearItem(key: string): void;
}