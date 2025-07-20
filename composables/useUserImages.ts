import type { ImageMetadata } from "@/types/image";

export default function useUserImages() {
  const useStore = useUserStore();
  const { $userImageService } = useNuxtApp();

  const images = ref<ImageMetadata[]>([]);
  const image = ref<ImageMetadata | null>(null);
  const lastTimestamp = ref<number | null>(null);
  const isEndReached = ref(false);
  const hasLoadedOnce = ref(false);
  const isLoading = ref(false);

  async function getPaginatedImages() {
    const userId = useStore.user?.id;
    if (!userId) return;

    isLoading.value = true;

    const newImages = await $userImageService.getPaginatedUserImages(userId, 12, lastTimestamp.value ?? undefined);

    if (newImages.length === 0) {
      isEndReached.value = true;
    } else {
      images.value.push(...newImages);
      lastTimestamp.value = newImages[newImages.length - 1].timestamp;
    }
    isLoading.value = false;
    hasLoadedOnce.value = true;
  }

  async function getSingleImage(imageId: string) {
    const userId = useStore.user?.id;
    if (!userId) return null;

    isLoading.value = true;

    const data = await $userImageService.getSingleImage(userId, imageId);
    if (data) {
      image.value = data;
      return data;
    } else {
      console.error("Image not found");
      return null;
    }

    isLoading.value = false;
  }

  return {
    getPaginatedImages,
    getSingleImage,
    images,
    image,
    isLoading,
    isEndReached,
    hasLoadedOnce
  };
};