import { imageSchema } from "@/schemas/imageSchema";
import { generateImage } from "@/server/services/stability-ai/stabilityAIService";
import { verifyFirebaseToken } from "@/server/services/auth/firebaseService";
import { validateData } from "@/server/utils/validateData";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const validatedBody = validateData(imageSchema, await readBody(event));

  await verifyFirebaseToken(event);

  const apiKey = runtimeConfig.stableDiffusionKey;
  if (!apiKey) throw createError({ status: 500, message: "API key is not configured" });

  const data = await generateImage(validatedBody, apiKey);
  const artifact = data.artifacts?.[0];

  if (!artifact || !artifact.base64) throw createError({ status: 500, message: "Image generation failed or returned no data" });

  const base64 = `data:image/png;base64,${artifact.base64}`;

  const imageData = {
    "base64": base64,
    "seed": artifact.seed,
  };

  return imageData;
});
