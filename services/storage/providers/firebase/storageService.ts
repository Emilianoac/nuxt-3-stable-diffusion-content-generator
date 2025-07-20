import { ref, uploadBytes, getDownloadURL ,type FirebaseStorage, } from "firebase/storage";
import type { StorageService } from "@/services/storage/storageService";

export function createFirebaseStorageService(storage: FirebaseStorage): StorageService {
  return {
    async addItem(file, userId) {
      const storageRef = ref(storage,`users/${userId}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.error(error);
      }
    },
  }
}