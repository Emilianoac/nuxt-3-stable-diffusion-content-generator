
import type {  GeneratedImage } from "@/types/image";

export default function useCurrentImage() {
  const imageStore = useImageStore();
  const currentImage = computed(() => imageStore.currentImage.data);
  const isLoading = computed(() => imageStore.isLoading);

  function setCurrentImage(image: GeneratedImage | null) {
    imageStore.updateCurrentImage(image);
  }

  return {
    currentImage,
    isLoading,
    setCurrentImage,
  };
}