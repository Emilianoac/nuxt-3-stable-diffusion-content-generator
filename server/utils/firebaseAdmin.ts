import admin from "firebase-admin";

/**
 * Interface for the Firebase admin app parameters.
 */
interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

/**
 * Formats the private key to be valid in the firebase configuration object.
 */
function formatPrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

/**
 * Creates a Firebase admin app.
 */
export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);
 
  if (admin.apps.length > 0) {
    return admin.app();
  }
 
  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });
 
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}
 
/**
 * 
 */
export async function initAdmin() {
  const params = {
    projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };
 
  return createFirebaseAdminApp(params);
}