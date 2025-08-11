import { watch } from "vue";
import { imageHistoryService } from "@/services/domain/image-history/ImageHistoryService";
import { useImageHistoryStore } from "@/stores/imageHistory";
import { useImageGenerationStore } from "@/stores/imageGeneration";
import { storeToRefs } from "pinia";

let initialized = false;

export default function useImageHistory() {
  const imageGenerationStore = useImageGenerationStore();
  const imageHistoryStore = useImageHistoryStore();
  const { recentImages, isLoading } = storeToRefs(imageHistoryStore);

  function getImagesHistory() {
    imageHistoryStore.setLoadingState(true);
    const data = imageHistoryService.getImagesHistory();
    if (data) {
      recentImages.value = data;
    }
    imageHistoryStore.setLoadingState(false);
  }

  function clearImagesHistory() {
    imageHistoryService.clearHistory();
    recentImages.value = [];
  }

  if (!initialized) {
    watch(() => imageGenerationStore.generatedImage, (newImage) => {
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
