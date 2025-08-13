import { createGetUserImagesUseCase } from "@/services/use-cases/get-user-images/getUserImagesUseCase";
import { getFirebaseServices } from "@/lib/firebaseClient";

export default defineNuxtPlugin(() => {
  try {
    const { db } = getFirebaseServices();
    const getUserImagesService = createGetUserImagesUseCase(db);
    return {
      provide: { getUserImagesService}
    };
  } catch (error) {
    console.error("Failed to initialize user image service:", error);
    throw new Error("User image service initialization failed");
  }
});