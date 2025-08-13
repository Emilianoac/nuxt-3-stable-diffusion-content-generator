import "@/__mocks__/nuxt/mockNuxtApp";
import { saveImageUseCase } from "@/__mocks__/services/use-cases/save-image/saveImageUseCaseMock";
import { initStores, type PiniaStores } from "@/__mocks__/pinia/piniaStores";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useSaveImage from "@/composables/useSaveImage";


describe("useSaveImage", () => {
  let imageStore: PiniaStores["imageStore"];

  beforeEach(() => {
    ({ imageStore } = initStores());
    vi.clearAllMocks();
  });

  it("should save image and update state", async () => {
    const { saveImage, error,  isLoading } = useSaveImage();

    await saveImage();

    expect(saveImageUseCase).toHaveBeenCalled();
    expect(error.value.status).toBe(false);
    expect(isLoading.value).toBe(false);
  });

  it("should handle error when saving image", async () => {
    saveImageUseCase.mockRejectedValue(new Error("Failed to save image."));
    const { saveImage, error, isLoading } = useSaveImage();

    await saveImage();

    expect(saveImageUseCase).toHaveBeenCalled();
    expect(error.value.status).toBe(true);
    expect(error.value.message).toBe("Failed to save image.");
    expect(isLoading.value).toBe(false);
  });
})