
export interface GenereatedImage {
  base64?: string;
  isGenerated: boolean;
  isSaved: boolean;
  localStorageId?: string;
  data: {
    prompt: string;
    negative_prompt?: string;
    seed: number;
    steps: number;
    cfg_scale: number;
    model: string;
    samples: number;
    dimensions: string;
  };
}

export interface ImageHistoryService {
  addImageToHistory: (imageData: GenereatedImage) => void;
  getImagesHistory: () => GenereatedImage[];
  replaceImageInHistory: (imageData: GenereatedImage) => void;
  clearHistory: () => void;
}