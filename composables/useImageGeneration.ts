
import { imageGenerationService } from "@/services/image-generation/createImageGenerationService";
import { generateImageAPI } from "@/services/api/generate-image/generateImageAPI";
import useImageHistory  from "@/composables/useImageHistory";
import useAuth from "@/composables/useAuth";
import type { NewImageParamsUser } from "@/types/image";

export function useImageGeneration() {
  const { $storageService, $dbService } = useNuxtApp();
  const { getUserIdToken } = useAuth();
  const { replaceImageInHistory } = useImageHistory();

  const userStore = useUserStore();
  const imageStore = useImageStore();

  const newImageParams = computed(() => imageStore.imageGeneration.newImageParams);
  const currentImage = computed(() => imageStore.currentImage.data);
  const error = ref({ status: false, message: ""});
  
  async function generateImage(form: NewImageParamsUser) {
    imageStore.updateLoadingState(true);
    resetError();
    try {
      const useIdToken = await getUserIdToken();
      const imageData = await generateImageAPI(form, useIdToken);

      imageStore.updateGeneratedImage(imageData.base64, imageData.seed, form);
    } catch (err) {
      manageError(err);
    } finally {
      imageStore.updateLoadingState(false);
    }
  }

  async function processImageAndSave() {
    imageStore.updateLoadingState(true);
    resetError();
    
    if (!currentImage.value) {
      error.value = { status: true, message: "No current image to process." };
      return;
    }
    try {
      const base64 = currentImage.value.base64;
      if (!base64) throw new Error("No image generated to process.");

      const userId = userStore.user?.id;
      if (!userId) throw new Error("User is not authenticated.");

      const timestamp = Date.now();
      const id = `image-${timestamp}`;

      const compressedFile = await imageGenerationService.processBase64ToCompressedFile(base64, id);
      
      const url = await $storageService.addItem(compressedFile, userId);
      if (!url) throw new Error("Failed to upload image to storage.");

      const metadata = imageGenerationService.createMetadata(compressedFile, id, timestamp, url, currentImage.value.data);
      await $dbService.addUserImage(metadata, userId);

      currentImage.value.isSaved = true;
      replaceImageInHistory();
      
    } catch (err) {
      error.value = { 
        status: true, 
        message: err instanceof Error ? err.message : "An error occurred while processing the image." 
      };
    } finally {
      imageStore.updateLoadingState(false);
    }
  }

  function manageError(err: unknown) {
    error.value = {
      status: true,
      message: err instanceof Error ? err.message : "An unexpected error occurred."
    };
  }

  function resetError() {
    error.value = { status: false, message: "" };
  }

  return {
    generateImage,
    processImageAndSave,
    newImageParams,
    error,
  };
} 