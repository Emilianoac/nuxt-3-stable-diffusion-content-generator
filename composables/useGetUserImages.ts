import type { ImageMetadata } from "@/types/image";

export default function useGetUserImages() {
  const useStore = useUserStore();
  const { $getUserImagesService } = useNuxtApp();

  const images = ref<ImageMetadata[]>([]);
  const image = ref<ImageMetadata | null>(null);
  const lastTimestamp = ref<number | null>(null);
  const isEndReached = ref(false);
  const hasLoadedOnce = ref(false);
  const isLoading = ref(false);
  const error = ref({status: false, message: ""});

  async function getPaginatedImages() {
    const userId = useStore.user?.id;
    if (!userId) return;

    isLoading.value = true;

    const newImages = await $getUserImagesService.getPaginatedUserImages(userId, 12, lastTimestamp.value ?? undefined);

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
    error.value = { status: false, message: "" };
    isLoading.value = true;
    
    try {
      const userId = useStore.user?.id;
      if (!userId) throw new Error("User not authenticated");
      
      const data = await $getUserImagesService.getSingleImage(userId, imageId);
      if (!data) throw new Error("Image not found");
      image.value = data;
    } catch (err) {
      error.value = {
        status: true,
        message: err instanceof Error ? err.message : "An error occurred while fetching the image"
      };
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getPaginatedImages,
    getSingleImage,
    images,
    image,
    isLoading,
    isEndReached,
    hasLoadedOnce,
    error
  };
};