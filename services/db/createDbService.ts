import { ref, set } from "firebase/database";
import type { DBService } from "@/services/db/dbService.Inteface";
import type { Database } from "firebase/database";

export function createDBService(db: Database): DBService {
  return {
    async saveUserProfile(uid: string, profileData: any): Promise<void> {
      const userRef = ref(db, `users/${uid}`);
      await set(userRef, profileData);
    },
    async addUserImage(imageData, userId): Promise<void> {
      const imageName = imageData.id
      const imageRef = ref(db, `users/${userId}/images/${imageName}`);
      await set(imageRef, imageData);
    }
  };
}
