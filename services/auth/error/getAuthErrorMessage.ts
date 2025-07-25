import type { AuthErrorCode } from "./authCodes";

export function getAuthErrorMessage(code: AuthErrorCode): string {
  switch (code) {
    case "INVALID_CREDENTIAL":
      return "Invalid credentials";
    case "INVALID_EMAIL":
      return "provided email is invalid.";
    case "EMAIL_ALREADY_REGISTERED":
      return "The email is already registered.";
    case "CREDENTIAL_ALREADY_IN_USE":
      return "This credential is already in use by another account.";
    case "WEAK_PASSWORD":
      return "The password is too weak. Please choose a stronger password.";
    case "NETWORK_ERROR":
      return "Network error. Please check your connection and try again.";
    default:
      return "An unknown error occurred. Please try again later.";
  }
}
