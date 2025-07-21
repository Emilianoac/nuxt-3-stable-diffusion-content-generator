import { setActivePinia, createPinia } from "pinia";
import { useImageGenerationStore } from "@/stores/imageGeneration";
import { useUserStore } from "@/stores/user";
import { vi } from "vitest";


export interface PiniaStores {
  imageStore: ReturnType<typeof useImageGenerationStore>;
  userStore: ReturnType<typeof useUserStore>;
}

export function initStores( overrides?: PiniaStores): PiniaStores {
  setActivePinia(createPinia());

  const imageStore = useImageGenerationStore();
  imageStore.updateGeneratedImage = vi.fn();
  imageStore.generatedImage = {
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
    },
    ...(overrides?.imageStore?.generatedImage ?? {}),
  } 

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
