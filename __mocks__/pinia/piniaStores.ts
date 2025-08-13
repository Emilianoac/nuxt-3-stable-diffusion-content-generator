import { setActivePinia, createPinia } from "pinia";
import { useImageStore } from "@/stores/imageStore";
import { useUserStore } from "@/stores/user";
import { vi } from "vitest";
export interface PiniaStores {
  imageStore: ReturnType<typeof useImageStore>;
  userStore: ReturnType<typeof useUserStore>;
}

const currentImage = {
  base64: "fakeBase64",
  isGenerated: true,
  isSaved: false,
  data: {
    prompt: "test prompt",
    seed: 123,
    steps: 15,
    cfg_scale: 7,
    dimensions: "512x512",
    samples: 1,
    model: "some-model",
  }
}
  
export function initStores( overrides?: PiniaStores): PiniaStores {
  setActivePinia(createPinia());

  const imageStore = useImageStore();

  imageStore.currentImage.data = currentImage;

  imageStore.imageGeneration.generatedImage = {
    ...currentImage,
    ...(overrides?.imageStore ?? {}),
  } 

  imageStore.updateGeneratedImage = vi.fn();
  imageStore.updateCurrentImage = vi.fn();
  

  const userStore = useUserStore();
  userStore.user = { 
    id: "my-user-id", 
    email: "user@test.com", 
    name: "Test User", 
    ...(overrides?.userStore?.user ?? {}),
  };
  userStore.updateUser = vi.fn();

  return { imageStore, userStore };
}
