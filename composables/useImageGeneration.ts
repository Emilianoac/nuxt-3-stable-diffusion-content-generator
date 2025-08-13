import { generateImageAPI } from "@/services/api/generate-image/generateImageAPI";
import useAuth from "@/composables/useAuth";
import type { NewImageParamsUser } from "@/types/image";

export function useImageGeneration() {
  const { getUserIdToken } = useAuth();
  const imageStore = useImageStore();

  const newImageParams = computed(() => imageStore.imageGeneration.newImageParams);
  const error = computed(() => imageStore.error);
  
  async function generateImage(form: NewImageParamsUser) {
    imageStore.updateLoadingState(true);
    imageStore.updateError(false, "");
    try {
      const useIdToken = await getUserIdToken();
      const imageData = await generateImageAPI(form, useIdToken);

      imageStore.updateGeneratedImage(imageData.base64, imageData.seed, form);
    } catch (err) {
      imageStore.updateError(true, err instanceof Error ? err.message : "Failed to generate image.");
    } finally {
      imageStore.updateLoadingState(false);
    }
  }

  return {
    generateImage,
    newImageParams,
    error,
  };
} 