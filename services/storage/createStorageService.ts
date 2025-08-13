import { ref, uploadBytes, getDownloadURL ,type FirebaseStorage, } from "firebase/storage";
import type { StorageService } from "@/services/storage/storageService.interface";

export function createStorageService(storage: FirebaseStorage): StorageService {
  return {
    async addItem(file, userId) {
      const storageRef = ref(storage,`users/${userId}/${file.name}`);
      try {
        if (!storageRef) {
          throw new Error("Failed to create storage reference");
        }
        
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        if (!downloadURL) {
          throw new Error("Failed to get download URL after upload");
        }

        return downloadURL;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to upload file to storage");
      }
    },
  }
}