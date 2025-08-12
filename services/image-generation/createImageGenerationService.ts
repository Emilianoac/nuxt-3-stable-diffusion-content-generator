import { base64ToFile } from "@/services/image-generation/utils/base64Tofile";
import { compressImage } from "@/services/image-generation/utils/compressImage";
import { compressBase64 } from "@/services/image-generation/utils/compressBase64";
import type { ImageGenerationService } from "@/services/image-generation/imageGenerationService.interface";

export function createImageGenerationService(): ImageGenerationService {

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

      const compressedBase64 = await compressBase64(response.base64, 0.7);
      const data = {
        base64: compressedBase64,
        seed: response.seed,
      }

      return data;
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

export const imageGenerationService = createImageGenerationService();
