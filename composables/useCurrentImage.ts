
import type { GenereatedImage } from "@/services/domain/image-history/ImageHistoryService.interface";

export default function useCurrentImage() {
  const imageStore = useImageStore();
  const currentImage = computed(() => imageStore.currentImage.data);
  const isLoading = computed(() => imageStore.isLoading);

  function setCurrentImage(image: GenereatedImage | null) {
    imageStore.updateCurrentImage(image);
  }

  return {
    currentImage,
    isLoading,
    setCurrentImage,
  };
}