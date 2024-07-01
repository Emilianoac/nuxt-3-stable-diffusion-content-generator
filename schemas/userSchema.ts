import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
export type User = z.infer<typeof userSchema>;