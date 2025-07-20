import { z } from "zod";

// Create zod schema
export const imageSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  negative_prompt: z.string().optional(),
  seed: z
    .number()
    .int("Seed must be integer number")
    .nonnegative("Seed must be a positive number"),
  steps: z
    .number()
    .min(10,"Min value is 1")
    .max(20, "Max Value is 20")
    .int("Steps must be integer number")
    .positive("Steps must be a positive number"),
  cfg_scale: z.
    number()
    .min(0)
    .max(35)
    .int("Scale must be integer number")
    .positive("Scale must be a positive number"),
})

export type ImageSchema = z.output<typeof imageSchema>