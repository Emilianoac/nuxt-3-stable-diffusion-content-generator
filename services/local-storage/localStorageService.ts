import { type LocalStorageService } from "./localStorage.interface";

function createLocalStorageService(): LocalStorageService {
  return {
    setItem(key, value) {
      localStorage.setItem(key, value);
    },
    getItem(key) {
      const items = localStorage.getItem(key);
      return items
    },
    clearItem(key) {
      localStorage.removeItem(key);
    }
  };
}

export const localStorageService = createLocalStorageService();
