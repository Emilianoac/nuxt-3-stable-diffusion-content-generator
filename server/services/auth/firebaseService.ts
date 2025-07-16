import { getAuth } from "firebase-admin/auth";
import { initAdmin } from "@/server/utils/firebaseAdmin";
import { H3Event } from "h3";

export async function verifyFirebaseToken(event: H3Event): Promise<string> {
  const idToken = getRequestHeader(event, "Authorization")?.split(' ')[1];

  if (!idToken) {
    throw createError({ status: 401, message: "Authorization header is missing or malformed" });
  }

  await initAdmin();
  const auth = getAuth();

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    throw createError({ status: 401, message: "Invalid authorization token" });
  }
}
