import { ZodSchema } from "zod";

/**
 * Validates input data against a Zod schema.
 * Throws HTTP 400 error if validation fails.
 */
export function validateData<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = result.error.errors.map((e) => `Error: ${e.message}`).join(", ");
    throw createError({ status: 400, message });
  }
  return result.data;
}
