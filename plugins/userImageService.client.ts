import { createUserImageService, Provider } from "@/services/user-images/createUserImageService";
import { getFirebaseServices } from "@/lib/firebaseClient";

export default defineNuxtPlugin(() => {
  const provider = "firebase";

  if (provider === "firebase") {
    const { db } = getFirebaseServices();

    const userImageService = createUserImageService({
      provider: Provider.Firebase,
      deps: { db }
    })

    return {
      provide: { userImageService }
    }
  } else {
    console.warn("No valid user image service provider configured.");
  }
});