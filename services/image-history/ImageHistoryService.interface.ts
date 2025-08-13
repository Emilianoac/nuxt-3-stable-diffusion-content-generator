import type { GeneratedImage } from "@/types/image";
export interface ImageHistoryService {
  addImageToHistory: (imageData: GeneratedImage) => void;
  getImagesHistory: () => GeneratedImage[];
  replaceImageInHistory: (imageData: GeneratedImage) => void;
  clearHistory: () => void;
}