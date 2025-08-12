import { ref, onValue, get, child, query, orderByChild, limitToLast, endBefore } from "firebase/database";
import type { UserImageService } from "./userImageService.interface";
import type { ImageMetadata } from "@/types/image";
import type { Database } from "firebase/database";

export function createUserImageService(db: Database): UserImageService {
  return {
    async getPaginatedUserImages(userId, limit = 12, lastTimestamp) {
      console.log(lastTimestamp);
      const userRef = ref(db, `users/${userId}/images`);

      let imagesQuery;

      if (lastTimestamp !== undefined) {
        imagesQuery = query(userRef, orderByChild("timestamp"), endBefore(lastTimestamp), limitToLast(limit));
      } else {
        imagesQuery = query(userRef, orderByChild("timestamp"), limitToLast(limit));
      }

      return new Promise((resolve) => {
        onValue(imagesQuery, (snapshot) => {
          if (!snapshot.exists()) return resolve([]);

          const data = snapshot.val() as Record<string, ImageMetadata>;
          const images = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
          resolve(images);
        }, {
          onlyOnce: true 
        });
      });
    },

    async getSingleImage(userId, imageId) {
      const snapshot = await get(child(ref(db), `users/${userId}/images/${imageId}`));
      if (!snapshot.exists()) return null;
      return snapshot.val() as ImageMetadata;
    },

    subscribeToUserImages(user, callback) {
      const userRef = ref(db, `users/${user.id}/images`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (!snapshot.exists()) {
          callback([]);
          return;
        }
        const images = snapshot.val() as Record<string, ImageMetadata>;
        const sorted = Object.values(images).sort((a, b) => b.timestamp - a.timestamp);
        callback(sorted);
      });
      return unsubscribe;
    },
  };
}
