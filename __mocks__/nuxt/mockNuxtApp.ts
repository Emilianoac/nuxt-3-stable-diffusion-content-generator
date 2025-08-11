import { vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

export const mockAuthService = {
  getidToken: vi.fn(() => Promise.resolve("mock-token")),   
};

export const mockStorageService = {
  addItem: vi.fn(() => Promise.resolve("http://example.com/image.png")),
};

export const mockDbService = {
  addUserImage: vi.fn(() => Promise.resolve()),
};

mockNuxtImport("useNuxtApp", () => () => ({
  $authService: mockAuthService,
  $storageService: mockStorageService,
  $dbService: mockDbService,
}));
