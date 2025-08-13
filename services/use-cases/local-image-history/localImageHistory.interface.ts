import type { GeneratedImage } from "@/types/image";

export interface LocalImageHistoryUseCase {
  addImageToHistory: (imageData: GeneratedImage) => void;
  getImagesHistory: () => GeneratedImage[];
  replaceImageInHistory: (imageData: GeneratedImage) => void;
  clearHistory: () => void;
}