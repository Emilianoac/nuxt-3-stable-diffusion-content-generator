import { vi} from "vitest";

vi.mock("@/services/image-generation/createImageGenerationService", () => ({
  createImageGenerationService: () => ({
    generateImage: vi.fn(() => Promise.resolve({ base64: "fakeBase64", seed: 123 })),
    processBase64ToCompressedFile: vi.fn(() => new File(["data"], "image.png", { type: "image/png" })),
    createMetadata: vi.fn(() => ({ id: "image-123", url: "http://example.com/image.png" })),
  }),
}));


