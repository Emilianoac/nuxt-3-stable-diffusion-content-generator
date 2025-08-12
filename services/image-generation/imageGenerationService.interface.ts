import type { NewImageParams, ImageMetadata, NewImageParamsUser} from "@/types/image";

export interface ImageGenerationService {
  generateImage(form: NewImageParamsUser, authToken: string): Promise<{ base64: string, seed: number }>
  processBase64ToCompressedFile(base64: string, fileName: string): Promise<File>
  createMetadata(file: File, id: string, timestamp: number, url: string, params: NewImageParams): ImageMetadata
}