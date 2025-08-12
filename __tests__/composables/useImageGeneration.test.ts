import "@/__mocks__/services/api/generate-image/generateImageAPIMock";
import "@/__mocks__/nuxt/mockNuxtApp";
import { initStores, type PiniaStores } from "@/__mocks__/pinia/piniaStores";

import { describe, it, expect, beforeEach, vi } from "vitest";
import { useImageGeneration } from "@/composables/useImageGeneration";

describe("useImageGeneration", () => {
  let imageStore: PiniaStores["imageStore"];

  beforeEach(() => {
    ({ imageStore } = initStores());
  });

  it("should generate image and update store", async () => {
    // Arrange
    const { generateImage } = useImageGeneration();
    const formData = { prompt: "a cute cat", seed: 0, steps: 15, cfg_scale: 7 };

    // Act
    await generateImage(formData);

    // Assert
    expect(imageStore.updateGeneratedImage).toHaveBeenCalledWith("fakeBase64", 123, formData);
  });
});
