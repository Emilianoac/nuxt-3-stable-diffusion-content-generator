import { imageSchema } from "@/schemas/imageSchema";
import { generateImage } from "@/server/services/stability-ai/stabilityAIService";
import { verifyFirebaseToken } from "@/server/services/auth/firebaseService";
import { validateData } from "@/server/utils/validateData";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const validatedBody = validateData(imageSchema, await readBody(event));
  const { prompt, negative_prompt, steps, cfg_scale } = validatedBody;

  await verifyFirebaseToken(event);

  const apiKey = runtimeConfig.stableDiffusionKey;
  if (!apiKey) throw createError({ status: 500, message: "API key is not configured" });

  const data = await generateImage(validatedBody, apiKey);
  const artifact = data.artifacts?.[0];

  if (!artifact || !artifact.base64) throw createError({ status: 500, message: "Image generation failed or returned no data" });

  const timestamp = Date.now();
  const base64 = `data:image/png;base64,${artifact.base64}`;
  const name = `image-${timestamp}`;

  const imageData = {
    "base64": base64,
    "name": name,
    "timestamp": timestamp,
    "params": {
      "prompt": prompt,
      "negative_prompt": negative_prompt,
      "seed": artifact.seed,
      "steps": steps,
      "cfg_scale": cfg_scale,
      "dimensions": "1024x1024",
      "samples": 1,
      "model": "stable-diffusion-xl-1024-v1-0",
    }
  };

  return imageData;
});
