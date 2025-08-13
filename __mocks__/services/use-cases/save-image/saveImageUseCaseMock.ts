import { vi } from "vitest";

export const saveImageUseCase = vi.fn(() => Promise.resolve());

vi.mock("@/services/use-cases/save-image/saveImageUseCase", () => ({
  saveImageUseCase,
}));