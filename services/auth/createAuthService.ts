/**
 * Factory for creating authentication service instances based on the provider.
 * 
 * Currently supports Firebase. The factory is designed to be easily extended
 * to support other providers (e.g., Supabase, Hasura) by adding new cases.
 *
 * Use this to abstract provider-specific logic from the rest of the app.
 */

import { createFirebaseAuthService } from "@/services/auth/providers/firebase/authService";
import type { AuthService } from "./authService";
import type { Auth } from "firebase/auth";

type FirebaseDeps = {
  auth: Auth;
};

export enum Provider {
  Firebase = "firebase",
  // add other providers here
}

type ProviderDeps =
  | { provider: Provider.Firebase; deps: FirebaseDeps };
  // add other providers deps here
  
export function createAuthService(config: ProviderDeps): AuthService {
  switch (config.provider) {
    case Provider.Firebase:
      return createFirebaseAuthService(config.deps.auth);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
