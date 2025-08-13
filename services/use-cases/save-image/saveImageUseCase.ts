import { base64ToFile } from "@/utils/base64Tofile";
import type { SaveImageUseCase, CreateMetadata } from "./saveImageUseCase.interface";

const createMetadata: CreateMetadata = (file, id , timestamp, url, params) => {
  return {
    id: id,
    name: file.name,
    url,
    timestamp,
    ...params,
  }
}

export const saveImageUseCase: SaveImageUseCase = async (base64, params, { storageService, dbService, authService }) => {
  try {
    const userId = authService.getUserId();
    
    const timestamp = Date.now();
    const fileName = `image-${timestamp}`;
    const imageId = fileName;
    
    const file = base64ToFile(base64, fileName);
    const url = await storageService.addItem(file, userId);

    const metadata = createMetadata(file, imageId, timestamp, url, params);
    await dbService.addUserImage(metadata, userId);
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Failed to save image.");
  }
}
