export type AuthErrorCode =
  | "INVALID_CREDENTIAL"
  | "EMAIL_ALREADY_REGISTERED"
  | "CREDENTIAL_ALREADY_IN_USE"
  | "INVALID_EMAIL"
  | "WEAK_PASSWORD"
  | "NETWORK_ERROR"
  | "UNKNOW";

export enum AuthProvider {
  Firebase = "firebase",
}
