import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import type { AuthService } from "@/services/auth/authService";
import type { Auth } from "firebase/auth";

let userPromise: Promise<{ id: string; email: string; name?: string } | null> | null = null;

export function createFirebaseAuthService(auth: Auth): AuthService {
  return {
    async login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    },
    async register(email, password) {
      return createUserWithEmailAndPassword(auth, email, password);
    },
    async logout() {
      return signOut(auth);
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
