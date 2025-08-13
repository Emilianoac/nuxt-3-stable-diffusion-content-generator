import type { StorageService } from "@/services/storage/storageService.interface";
import type { DBService } from "@/services/db/dbService.Inteface";
import type { AuthService } from "@/services/auth/authService.interface";
import type { NewImageParams } from "@/types/image";

interface SaveImageDeps {
  storageService: StorageService;
  dbService: DBService;
  authService: AuthService;
}

interface createMetadataReturn extends NewImageParams {
  id: string;
  name: string;
  url: string;
  timestamp: number;
}

export type CreateMetadata = (file: File, id: string, timestamp: number, url: string, params: NewImageParams) => createMetadataReturn;
export type SaveImageUseCase = (base64: string, params: NewImageParams, deps: SaveImageDeps) => Promise<void>;

