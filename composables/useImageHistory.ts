import { watch } from "vue";
import { imageHistoryService } from "@/services/domain/image-history/ImageHistoryService";
import { useImageStore } from "@/stores/imageStore";

let initialized = false;

export default function useImageHistory() {
  const imageStore = useImageStore();
  const recentImages = computed(() => imageStore.imageHistory.data);
  const isLoading = computed(() => imageStore.imageHistory.isLoading);

  function getImagesHistory() {
    const data = imageHistoryService.getImagesHistory();
    imageStore.updateImageHistory(data);
  }

  function clearImagesHistory() {
    imageHistoryService.clearHistory();
  }

  if (!initialized) {
    watch(() => imageStore.imageGeneration.generatedImage, (newImage) => {
      const validImage = newImage && newImage.base64 && newImage.isGenerated;

      if (validImage) {
        imageHistoryService.addImageToHistory(newImage);
        getImagesHistory();
      }
    });
    initialized = true;
  }

  return {
    getImagesHistory,
    clearImagesHistory,
    recentImages,
    isLoading,
  };
}
