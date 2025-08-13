import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { mapAuthError, getAuthErrorMessage } from "@/services/auth/error/error";

import type { AuthService } from "@/services/auth/authService.interface";
import type { Auth } from "firebase/auth";

let userPromise: Promise<{ id: string; email: string; name?: string } | null> | null = null;

export function createAuthService(auth: Auth): AuthService {
  return {
    async login(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        const errorCode = mapAuthError(err);
        const message = getAuthErrorMessage(errorCode);
        throw new Error(message);
      }
    },

    async register(email, password) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        if (!user.uid || !user.email) {
          throw new Error("User registration failed");
        }
        
        return {
          id: user.uid,
          email: user.email,
          name: user.displayName ?? undefined
        }
      } catch (err) {
        const errorCode = mapAuthError(err);
        const message = getAuthErrorMessage(errorCode);
        throw new Error(message);
      }
    },
    
    async logout() {
      try {
        await signOut(auth);
      } catch (err) {
        const errorCode = mapAuthError(err);
        const message = getAuthErrorMessage(errorCode);
        throw new Error(message);
      }
    },

    async getidToken() {
      const user = auth.currentUser;
      if (user) {
        return user.getIdToken();
      }
      return null;
    },

    async getUser() {
      if (!userPromise) {
        userPromise = new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user ? { id: user.uid, email: user.email ?? "", name: user.displayName ?? undefined } : null);
          });
        });
      }
      return userPromise;
    },

    getUserId() {
      const user = auth.currentUser;
      const userId = user?.uid
      if (!userId) {
        throw new Error("No authenticated user found");
      }
      return userId;
    },

    listenToAuthChanges(callback: (user: { id: string; email: string; name?: string } | null) => void) {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          callback({ id: user.uid, email: user.email ?? "", name: user.displayName ?? undefined });
        } else {
          callback(null);
        }
      });
    }
  }
};
