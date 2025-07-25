import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import type { AuthService } from "@/services/auth/authService";
import type { Auth } from "firebase/auth";
import { AuthProvider, mapAuthError, getAuthErrorMessage } from "@/services/auth/error/error";

let userPromise: Promise<{ id: string; email: string; name?: string } | null> | null = null;

export function createFirebaseAuthService(auth: Auth): AuthService {
  return {
    async login(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        const errorCode = mapAuthError(err, AuthProvider.Firebase);
        const message = getAuthErrorMessage(errorCode);
        throw new Error(message);
      }
    },
    async register(email, password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error("Registration error:", err);
        const errorCode = mapAuthError(err, AuthProvider.Firebase);
        const message = getAuthErrorMessage(errorCode);
        console.log(message)
        throw new Error(message);
      }
    },
    async logout() {
      try {
        await signOut(auth);
      } catch (err) {
        const errorCode = mapAuthError(err, AuthProvider.Firebase);
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
