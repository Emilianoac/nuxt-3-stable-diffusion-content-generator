import { type AuthErrorCode } from "./authCodes";

export function mapAuthError(err: unknown): AuthErrorCode {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = (err as { code: string }).code;

    switch (code) {
      case "auth/invalid-credential":
        return "INVALID_CREDENTIAL";
      case "auth/invalid-email":
        return "INVALID_EMAIL";
      case "auth/email-already-in-use":
        return "EMAIL_ALREADY_REGISTERED";
      case "auth/credential-already-in-use":
        return "CREDENTIAL_ALREADY_IN_USE";
      case "auth/weak-password":
        return "WEAK_PASSWORD";
      case "auth/network-request-failed":
        return "NETWORK_ERROR";
      default:
        return "UNKNOW";
    }
  }
  return "UNKNOW";
}
