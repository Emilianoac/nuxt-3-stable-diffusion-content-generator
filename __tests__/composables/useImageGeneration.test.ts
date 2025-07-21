import "../mocks/services/mockImageGenerationService";
import { mockAuthService } from "../mocks/nuxt/mockNuxtApp";

import { setActivePinia, createPinia } from "pinia";
import { useImageGenerationStore } from "@/stores/imageGeneration";
import { useImageGeneration } from "@/composables/useImageGeneration";
import { describe, it, vi, expect, beforeEach } from "vitest";

describe("useImageGeneration", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const store = useImageGenerationStore();
    store.updateGeneratedImage = vi.fn();
    store.generatedImage = {
      base64: "fakeBase64",
      data: {
        prompt: "test prompt",
        seed: 123,
        steps: 15,
        cfg_scale: 7,
        dimensions: "512x512",
        samples: 1,
        model: "some-model",
      },
    } as any;
  });

  it("should generate image and update store", async () => {
    const { generateImage } = useImageGeneration();

    await generateImage({
      prompt: "a cute cat",
      seed: 0,
      steps: 15,
      cfg_scale: 7,
    });

    const store = useImageGenerationStore();
    expect(store.updateGeneratedImage).toHaveBeenCalledWith("fakeBase64", 123, expect.any(Object));
  });

  it("should process image and save metadata", async () => {
    const { processImageAndSave, error } = useImageGeneration();
    await processImageAndSave();

    expect(error.value.status).toBe(false);
  });

  it("should set error if not authenticated", async () => {
    (mockAuthService.getidToken as any).mockImplementationOnce(() => Promise.resolve(null));

    const { processImageAndSave, error } = useImageGeneration();
    await processImageAndSave();

    expect(error.value.status).toBe(true);
    expect(error.value.message).toMatch(/User is not authenticated/);
  });
});
