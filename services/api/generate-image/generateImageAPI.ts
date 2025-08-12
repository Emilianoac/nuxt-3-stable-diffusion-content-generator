import { compressBase64 } from "@/utils/compressBase64";
import type { GenerateImageAPI } from "./generateImage.interface";

export const generateImageAPI: GenerateImageAPI = async ( form, authToken) => {
  const response = await $fetch<{ base64: string, seed: number }>("api/create/text-to-image", {
    method: "POST",
    body: form,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response || !response.base64) {
    throw new Error("Image generation failed or returned no data");
  }

  const compressedBase64 = await compressBase64(response.base64, 0.7);
  const data = {
    base64: compressedBase64,
    seed: response.seed,
  }

  return data;
};