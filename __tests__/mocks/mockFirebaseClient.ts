import { vi } from "vitest";

vi.mock("@/lib/firebaseClient", () => ({
  getFirebaseServices: () => ({
    auth: {
      currentUser: { uid: "mock-user" },
      signInWithEmailAndPassword: vi.fn(() => Promise.resolve()),
      createUserWithEmailAndPassword: vi.fn(() => Promise.resolve()),
      signOut: vi.fn(() => Promise.resolve()),
      onAuthStateChanged: vi.fn((auth, callback ) => {
        callback({ uid: "mock-user", email: "test.example.com", displayName: "Test User" });
        return () => {};
      })
    },
    db: {},
    storage: {},
  }),
}));