import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";
import { getStorage, type FirebaseStorage } from "firebase/storage";

let app: FirebaseApp
let auth: Auth
let db: Database
let storage: FirebaseStorage

export function getFirebaseServices() {
  if (!getApps().length) {
    const {
      FIREBASE_API_KEY, 
      FIREBASE_AUTH_DOMAIN, 
      FIREBASE_PROJECT_ID, 
      FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID
    } = useRuntimeConfig().public;

    const firebaseConfig = {
      apiKey: FIREBASE_API_KEY as string,
      authDomain: FIREBASE_AUTH_DOMAIN as string,
      projectId: FIREBASE_PROJECT_ID as string,
      storageBucket: FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID as string,
      appId: FIREBASE_APP_ID as string
    };

    app = initializeApp(firebaseConfig);
  }

  auth = auth || getAuth(app)
  db = db || getDatabase(app)
  storage = storage || getStorage(app)

  return { app, auth, db, storage }
}
