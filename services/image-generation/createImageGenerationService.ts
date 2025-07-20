import { createDefaultImageGenerationService } from "@/services/image-generation/providers/default/defaultImageService";
import type { ImageGenerationService } from "./imageGenerationService";

export function createImageGenerationService(): ImageGenerationService {
  const provider = "default";

  switch (provider) {
    case "default":
    default:
      return createDefaultImageGenerationService()
  }
}
