import { base64ToFile } from "@/services/image-generation/utils/base64Tofile";
import { compressImage } from "@/services/image-generation/utils/compressImage";
import type { ImageGenerationService } from "@/services/image-generation/imageGenerationService";

export function createDefaultImageGenerationService(): ImageGenerationService {
  return {
    async generateImage(form, authToken) {
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
      return {
        base64: response.base64,
        seed: response.seed,
      };
    },

    async processBase64ToCompressedFile(base64, fileName) {
      const file = base64ToFile(base64, fileName)
      return await compressImage(file)
    },

    createMetadata(file, id, timestamp, url, params) {
      return {
        id: id,
        name: file.name,
        url,
        timestamp,
        ...params,
      }
    },
  }
}
