
import { getFirebaseServices } from "@/lib/firebaseClient";
import { createAuthService } from "@/services/auth/createAuthService";

export default defineNuxtPlugin(() => {
  try {
    const { auth } = getFirebaseServices();
    const authService = createAuthService(auth);
    return { provide: { authService } };
  } catch (error) {
    console.error("Failed to initialize authService:", error);
    throw new Error("Authentication service initialization failed");
  }
});