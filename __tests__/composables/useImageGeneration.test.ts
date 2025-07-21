import "../mocks/services/mockImageGenerationService";
import "../mocks/nuxt/mockNuxtApp";
import { mockDbService } from "../mocks/nuxt/mockNuxtApp";

import { describe, it, expect, beforeEach } from "vitest";
import { useImageGeneration } from "@/composables/useImageGeneration";
import { initStores, type PiniaStores } from "@/__tests__/pinia/piniaStores";

describe("useImageGeneration", () => {
  let userStore: PiniaStores["userStore"];
  let imageStore: PiniaStores["imageStore"];

  beforeEach(() => {
    ({ imageStore, userStore } = initStores());
  });

  it("should generate image and update store", async () => {
    // 🛠️ Arrange
    const { generateImage } = useImageGeneration();
    const formData = { prompt: "a cute cat", seed: 0, steps: 15, cfg_scale: 7 };

    // 🚀 Act
    await generateImage(formData);

    // ✅ Assert
    expect(imageStore.updateGeneratedImage).toHaveBeenCalledWith("fakeBase64", 123, formData);
  });

  it("should process image and save metadata", async () => {
    // 🛠️ Arrange
    const { processImageAndSave, error } = useImageGeneration();
    
    // 🚀 Act
    await processImageAndSave();

    // ✅ Assert
    expect(mockDbService.addUserImage).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.stringContaining("image-"),
        url: expect.stringContaining("http"),
        ...imageStore.generatedImage.data,
      }),
      userStore.user?.id
    );
    expect(error.value.status).toBe(false);
  });

  it("should set error if not user in store", async () => {
    // 🛠️ Arrange
    userStore.user = null;
    const { processImageAndSave, error } = useImageGeneration();

    // 🚀 Act
    await processImageAndSave();

    // ✅ Assert
    expect(error.value.status).toBe(true);
    expect(error.value.message).toMatch(/User is not authenticated/);
  });
});
