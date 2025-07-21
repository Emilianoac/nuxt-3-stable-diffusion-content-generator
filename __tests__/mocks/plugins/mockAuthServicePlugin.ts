import { expect, vi } from "vitest";

vi.mock("@/plugins/01-authService.client", () => {
  return {
    default: defineNuxtPlugin(() => {
      const mockAuthService = {
        login: vi.fn().mockResolvedValue(true),
        register: vi.fn().mockResolvedValue(true),
        logout: vi.fn().mockResolvedValue(undefined),
        getidToken: vi.fn().mockResolvedValue('mock-token'),
        getUser: vi.fn().mockResolvedValue(null),
        listenToAuthChanges: vi.fn(() => () => {})
      };
      
      return { 
        provide: { 
          authService: mockAuthService 
        } 
      };
    })
  };
});