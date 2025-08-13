import { localStorageService } from "@/services/local-storage/localStorageService";
import type { LocalImageHistoryUseCase } from "@/services/use-cases/local-image-history/localImageHistory.interface";
import type { GeneratedImage } from "@/types/image";


function createImageLocalHistoryService(): LocalImageHistoryUseCase {
  const storageKey = "recentImagesHistory";

  function getHistory(): GeneratedImage[] {
    const items = localStorageService.getItem(storageKey);
    return items ? JSON.parse(items) as GeneratedImage[] : [];
  }

  function saveHistory(history: GeneratedImage[]) {
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

    replaceImageInHistory: (imageData) => {
      try {
        const history = getHistory();
        const index = history.findIndex(img => img.localStorageId === imageData.localStorageId);
        if (index !== -1) {
          history[index] = imageData;
          saveHistory(history);
        } else {
          console.warn("Image to replace not found in history.");
        }
      } catch (error) {
        console.error("Error replacing image in history:", error);
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

export const imageLocalHistoryService = createImageLocalHistoryService();