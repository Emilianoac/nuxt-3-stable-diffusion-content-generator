import { type AuthErrorCode, AuthProvider } from "./authCodes";
import { mapFirebaseError } from "../providers/firebase/authError";

export function mapAuthError(err: unknown, provider: AuthProvider): AuthErrorCode {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = (err as { code: string }).code;

    console.log("mapAuthError", { code, provider });

    switch (provider) {
      case AuthProvider.Firebase:
        return mapFirebaseError(code);
      default:
        return "UNKNOW";
    }
  }
  return "UNKNOW";
}
