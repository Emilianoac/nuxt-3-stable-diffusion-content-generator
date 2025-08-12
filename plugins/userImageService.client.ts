import { createUserImageService } from "@/services/user-images/createUserImageService";
import { getFirebaseServices } from "@/lib/firebaseClient";

export default defineNuxtPlugin(() => {
  try {
    const { db } = getFirebaseServices();
    const userImageService = createUserImageService(db);
    return {
      provide: { userImageService }
    };
  } catch (error) {
    console.error("Failed to initialize user image service:", error);
    throw new Error("User image service initialization failed");
  }
});