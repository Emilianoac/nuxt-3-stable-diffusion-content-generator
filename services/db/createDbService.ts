/**
 * Factory for creating database service instances based on the provider.
 * 
 * Currently supports Firebase. The factory is designed to be easily extended
 * to support other providers (e.g., Supabase, Hasura) by adding new cases.
 *
 * Use this to abstract provider-specific logic from the rest of the app.
 */

import { createFirebaseDbService } from "@/services/db/providers/firebase/dbService";
import type { DBService } from "./dbService";
import type { Database } from "firebase/database";

type FirebaseDeps = {
  db: Database;
};

export enum Provider {
  Firebase = "firebase",
  // add other providers here
}

type ProviderDeps =
  | { provider: Provider.Firebase; deps: FirebaseDeps };
  // add other providers deps here
  
export function createDbService(config: ProviderDeps): DBService {
  switch (config.provider) {
    case Provider.Firebase:
      return createFirebaseDbService(config.deps.db);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
