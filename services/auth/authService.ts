
import type { User } from "@/types/user";

export interface AuthService {
  login(email: string, password: string): Promise<any>;
  register(email: string, password: string): Promise<{id: string; email: string; name?: string}>;
  logout(): Promise<void>;
  getidToken(): Promise<string | null>;
  getUser(): Promise<User | null>;
  listenToAuthChanges(callback: (user: User | null) => void): () => void;
}
