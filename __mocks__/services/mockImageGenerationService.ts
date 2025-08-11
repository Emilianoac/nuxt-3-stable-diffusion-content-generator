import { vi} from "vitest";
import type { ImageGenerationService } from "@/services/image-generation/imageGenerationService";

export const generateImageMock = vi.fn(() => Promise.resolve({ base64: "fakeBase64", seed: 123 }));
export const processBase64ToCompressedFileMock = vi.fn(() => Promise.resolve(new File(["data"], "image.png", { type: "image/png" })));
export const createMetadataMock = vi.fn(() => ({
  id: "image-123",
  timestamp: Date.now(),
  url: "http://example.com/image.png",
  name: "image.png",
  prompt: "test prompt",
  seed: 123,
  steps: 15,
  cfg_scale: 7,
  dimensions: "512x512",
  samples: 1,
  model: "some-model",
}));

vi.mock("@/services/image-generation/createImageGenerationService", () => ({
  createImageGenerationService: () => ({
    generateImage: generateImageMock,
    processBase64ToCompressedFile: processBase64ToCompressedFileMock,
    createMetadata: createMetadataMock,
  }) as ImageGenerationService,
}));
