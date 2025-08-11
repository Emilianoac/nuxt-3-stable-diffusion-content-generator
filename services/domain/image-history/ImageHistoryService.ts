import { localStorageService } from "@/services/local-storage/localStorageService";
import type { ImageHistoryService, GenereatedImage } from "./ImageHistoryService.interface";

function createImageHistoryService(): ImageHistoryService {
  const storageKey = "recentImagesHistory";

  function getHistory(): GenereatedImage[] {
    const items = localStorageService.getItem(storageKey);
    return items ? JSON.parse(items) as GenereatedImage[] : [];
  }

  function saveHistory(history: GenereatedImage[]) {
    localStorageService.setItem(storageKey, JSON.stringify(history));
  }

  return {
    addImageToHistory: (imageData) => {
      try {
        const history = getHistory();
  
        if (history.length >= 3) {
          history.pop(); 
        }
  
        history.unshift(imageData);
        saveHistory(history);
      } catch (error) {
        console.error("Error saving image history to localStorage:", error);
      }
    },
    
    getImagesHistory: () => {
      try {
        const history = getHistory();
        return history;

      } catch (error) {
        console.error("Error parsing image history from localStorage:", error);
        return [];
      }
    },

    clearHistory: () => {
      try {
        localStorageService.clearItem(storageKey);
      } catch (error) {
        console.error("Error clearing image history from localStorage:", error);
      }
    }
  }
}

export const imageHistoryService = createImageHistoryService();