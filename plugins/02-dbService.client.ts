
import { getFirebaseServices } from "@/lib/firebaseClient";
import { createDbService, Provider } from "@/services/db/createDbService";

export default defineNuxtPlugin(() => {
  const provider = "firebase";

  if (provider === "firebase") {
    const { db } = getFirebaseServices();
    const dbService = createDbService({
      provider: Provider.Firebase,
      deps: { db }
    });

    return { provide: { dbService } };
  } else {
    console.warn("No valid database provider configured.");
  }
});