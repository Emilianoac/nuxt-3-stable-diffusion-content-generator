import { saveImageUseCase } from "@/services/use-cases/save-image/saveImageUseCase";
import useImageHistory from "@/composables/useImageHistory";

export default function useSaveImage() {
  const { $storageService, $dbService, $authService } = useNuxtApp();

  const { updateImageInLocalHistory } = useImageHistory();

  const imageStore = useImageStore();

  const currentImage = computed(() => imageStore.currentImage.data);
  const error = computed(() => imageStore.error);
  const isLoading = computed(() => imageStore.isLoading);

  const deps = {
    storageService: $storageService,
    dbService: $dbService,
    authService: $authService,
  };

  async function saveImage() {
    imageStore.updateLoadingState(true);
    imageStore.updateError(false, "");

    try {
      const { base64, data } = getValidImageData();

      await saveImageUseCase(base64, data, deps );

      imageStore.updateCurrentImageSaved(true);
      updateImageInLocalHistory();
    } catch (err) {
      imageStore.updateError(true, err instanceof Error ? err.message : "Failed to save image.");
    } finally {
      imageStore.updateLoadingState(false);
    }
  }

  function getValidImageData() {
    if (!currentImage.value || !currentImage.value.base64) {
      throw new Error("No image to save.");
    }
    return {
      base64: currentImage.value.base64,
      data: currentImage.value.data
    };
  }

  return {
    saveImage,
    isLoading,
    error,
  };
}