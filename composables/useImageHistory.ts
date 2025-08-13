import { watch } from "vue";
import { imageHistoryService } from "@/services/image-history/ImageHistoryService";
import { useImageStore } from "@/stores/imageStore";

let initialized = false;

export default function useImageHistory() {
  const imageStore = useImageStore();
  const recentImages = computed(() => imageStore.imageHistory.data);
  const currentImage = computed(() => imageStore.currentImage.data);
  const isLoading = computed(() => imageStore.imageHistory.isLoading);

  function getImagesHistory() {
    const data = imageHistoryService.getImagesHistory();
    imageStore.updateImageHistory(data);
  }

  function updateImageInLocalHistory() {
    if (!currentImage.value || !currentImage.value.localStorageId) {
      console.warn("No current image to replace in history.");
      return;
    }
    imageHistoryService.replaceImageInHistory(currentImage.value);
    getImagesHistory();
  }

  function clearImagesHistory() {
    imageHistoryService.clearHistory();
  }

  if (!initialized) {
    watch(() => imageStore.imageGeneration.generatedImage, (newImage) => {
      const validImage = newImage && newImage.base64 && newImage.isGenerated;

      if (validImage) {
        const image = { ...newImage, localStorageId: `local-${Date.now()}`};
        imageHistoryService.addImageToHistory(image);
        getImagesHistory();
      }
    });
    initialized = true;
  }

  return {
    getImagesHistory,
    updateImageInLocalHistory,
    clearImagesHistory,
    recentImages,
    isLoading,
  };
}
