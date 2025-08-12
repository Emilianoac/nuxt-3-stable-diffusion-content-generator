
import { getFirebaseServices } from "@/lib/firebaseClient";
import { createStorageService } from "@/services/storage/createStorageService";

export default defineNuxtPlugin(() => {
  try {
    const { storage } = getFirebaseServices();
    const storageService = createStorageService(storage);
    return { provide: { storageService } };
  } catch (error) {
    console.error("Failed to initialize Storage service:", error);
    throw new Error("Storage service initialization failed");
  }
});