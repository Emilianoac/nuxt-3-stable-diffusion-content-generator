
import { createImageGenerationService } from "@/services/image-generation/createImageGenerationService";
import { compressBase64 } from "@/utils/compressBase64"; 
import type { NewImageParamsUser } from "@/types/image";

export function useImageGeneration() {
  const { $storageService, $authService, $dbService } = useNuxtApp();
  const imageService = createImageGenerationService();

  const userStore = useUserStore();
  const imageStore = useImageStore();

  const newImageParams = computed(() => imageStore.imageGeneration.newImageParams);
  const generatedImage = computed(() => imageStore.imageGeneration.generatedImage);
  const currentImage = computed(() => imageStore.currentImage.data);
  const error = ref({ status: false, message: ""});
  
  async function generateImage(form: NewImageParamsUser) {
    error.value = { status: false, message: "" };
    imageStore.updateLoadingState(true);
    try {
      const idToken = await $authService.getidToken();
      if (!idToken) throw new Error("User is not authenticated.");

      const data = await imageService.generateImage(form, idToken);
      if (!data) throw new Error("Image generation failed or returned no data");

      const compressedBase64 = await compressBase64(data.base64, 0.7);
      imageStore.updateGeneratedImage(compressedBase64, data.seed, form);
      imageStore.updateCurrentImage(imageStore.imageGeneration.generatedImage);
    } catch (err) {
      error.value = {
        status: true,
        message: err instanceof Error ? err.message : "An error occurred while generating the image."
      }
    } finally {
      imageStore.updateLoadingState(false);
    }
  }

  async function processImageAndSave() {
    error.value = { status: false, message: "" };
    imageStore.updateLoadingState(true);
    try {
      const base64 = generatedImage.value.base64;
      if (!base64) throw new Error("No image generated to process.");

      const userId = userStore.user?.id;
      if (!userId) throw new Error("User is not authenticated.");

      const timestamp = Date.now();
      const id = `image-${timestamp}`;

      const compressedFile = await imageService.processBase64ToCompressedFile(base64, id);
      
      const url = await $storageService.addItem(compressedFile, userId);
      if (!url) throw new Error("Failed to upload image to storage.");

      const metadata = imageService.createMetadata(compressedFile, id, timestamp, url, generatedImage.value.data);
      await $dbService.addUserImage(metadata, userId);
    } catch (err) {
      error.value = { 
        status: true, 
        message: err instanceof Error ? err.message : "An error occurred while processing the image." 
      };
    } finally {
      imageStore.updateLoadingState(false);
    }
  }

  return {
    generateImage,
    processImageAndSave,
    newImageParams,
    currentImage,
    error,
  };
} 