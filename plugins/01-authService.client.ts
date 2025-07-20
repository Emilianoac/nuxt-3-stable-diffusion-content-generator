
import { getFirebaseServices } from "@/lib/firebaseClient";
import { createAuthService, Provider } from "@/services/auth/createAuthService";

export default defineNuxtPlugin((nuxtApp) => {
  const provider = "firebase";

   if (provider === "firebase") {
     const { auth } = getFirebaseServices();
     const authService = createAuthService({
       provider: Provider.Firebase,
       deps: { auth }
     });
 
     return { provide: { authService } };
   } else {
     console.warn("No valid database provider configured.");
   }
});