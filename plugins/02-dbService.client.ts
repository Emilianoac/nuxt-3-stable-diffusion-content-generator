
import { getFirebaseServices } from "@/lib/firebaseClient";
import { createDBService } from "@/services/db/createDbService";

export default defineNuxtPlugin(() => {
  try {
    const { db } = getFirebaseServices();
    const dbService = createDBService(db);
    return { provide: { dbService } };
  } catch (error) {
    console.error("Failed to initialize DB service:", error);
    throw new Error("Database service initialization failed");
  }
});