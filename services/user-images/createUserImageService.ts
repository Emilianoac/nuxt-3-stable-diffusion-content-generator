import { createFirebaseUserImageService } from "@/services/user-images/providers/firebase/userImageService";
import type { UserImageService } from "./userImageService";
import type { Database } from "firebase/database";

export enum Provider {
  Firebase = "firebase",
  // add other providers here
}

type FirebaseDeps = {
  db: Database;
};

// discriminated union for provider dependencies
type ProviderDeps =
  | { provider: Provider.Firebase; deps: FirebaseDeps };
  

export function createUserImageService(config: ProviderDeps): UserImageService {
  switch (config.provider) {
    case Provider.Firebase:
      return createFirebaseUserImageService(config.deps.db);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
