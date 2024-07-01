// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const {
    FIREBASE_API_KEY, 
    FIREBASE_AUTH_DOMAIN, 
    FIREBASE_PROJECT_ID, 
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
  } = useRuntimeConfig().public;

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY as string,
    authDomain: FIREBASE_AUTH_DOMAIN as string,
    projectId: FIREBASE_PROJECT_ID as string,
    storageBucket: FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID as string,
    appId: FIREBASE_APP_ID as string
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 
  return {
    provide: {
      auth
    }
  }
})

