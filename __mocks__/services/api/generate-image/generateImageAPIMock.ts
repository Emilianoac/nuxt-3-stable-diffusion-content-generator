import { vi} from "vitest";

export const generateImageMock = vi.fn(() => Promise.resolve({ base64: "fakeBase64", seed: 123 }));

vi.mock("@/services/api/generate-image/generateImageAPI", () => ({
 generateImageAPI: generateImageMock
}));



