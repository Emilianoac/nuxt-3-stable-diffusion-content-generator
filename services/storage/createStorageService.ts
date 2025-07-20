/**
 * Factory for creating storage service instances based on the provider.
 * 
 * Currently supports Firebase. The factory is designed to be easily extended
 * to support other providers (e.g., Supabase, Hasura) by adding new cases.
 *
 * Use this to abstract provider-specific logic from the rest of the app.
 */

import { createFirebaseStorageService } from "@/services/storage/providers/firebase/storageService";
import type { StorageService } from "./storageService";
import type { FirebaseStorage  } from "firebase/storage";

type FirebaseDeps = {
  storage: FirebaseStorage;
};

export enum Provider {
  Firebase = "firebase",
  // add other providers here
}

type ProviderDeps =
  | { provider: Provider.Firebase; deps: FirebaseDeps };
  // add other providers deps here
  
export function createStorageService(config: ProviderDeps): StorageService {
  switch (config.provider) {
    case Provider.Firebase:
      return createFirebaseStorageService(config.deps.storage);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
