
import { getFirebaseServices } from "@/lib/firebaseClient";
import { createStorageService, Provider  } from "~/services/storage/createStorageService";

export default defineNuxtPlugin(() => {
  const provider = "firebase";

   if (provider === "firebase") {
     const { storage } = getFirebaseServices();
     const storageService = createStorageService({
       provider: Provider.Firebase,
       deps: { storage }
     });
 
     return { provide: { storageService } };
   } else {
     console.warn("No valid database provider configured.");
   }
});