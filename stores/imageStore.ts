import { defineStore } from "pinia";
import type { NewImageParamsUser } from "@/types/image";
import type { GenereatedImage } from "@/services/domain/image-history/ImageHistoryService.interface";

interface State {
  isLoading: boolean;
  currentImage: {
    data: GenereatedImage | null;
  };
  imageGeneration: {
    newImageParams: NewImageParamsUser;
    generatedImage: GenereatedImage
  };
  imageHistory: {
    data: GenereatedImage[];
    isLoading: boolean;
  };
}

const newImageBaseParams = {
  dimensions: "1024x1024",
  samples: 1,
  model: "stable-diffusion-xl-1024-v1-0",
}

export const useImageStore = defineStore("imageStore", {
  state: (): State => ({
    isLoading: false,

    currentImage: {
      data: null,
    },

    imageGeneration: {
      newImageParams: {
        prompt: "",
        negative_prompt: "",
        seed: 0,
        steps: 15,
        cfg_scale: 7,
        ...newImageBaseParams,
      },
      generatedImage: {
        isSaved: false,
        base64: undefined,
        isGenerated: false,
        data: {
          prompt: "",
          negative_prompt: "",
          seed: 0,
          steps: 15,
          cfg_scale: 7,
          ...newImageBaseParams,
        },
      }
    },

    imageHistory: {
      data: [],
      isLoading: false
    },
  }),
  actions: {
    updateLoadingState(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    updateCurrentImage(data: GenereatedImage | null) {
      this.currentImage.data = data;
    },

    updateGeneratedImage(base64: string, seed: number, form: NewImageParamsUser) {
      this.imageGeneration.generatedImage = {
        isSaved: false,
        isGenerated: true,
        base64,
        data: {
          ...newImageBaseParams,
          ...form,
          seed,
        },
      }
    },

    updateImageHistory(data: GenereatedImage[]) {
      this.imageHistory.data = data;
    },
    updateImageHistoryLoadingState(isLoading: boolean) {
      this.imageHistory.isLoading = isLoading;
    },
  }
});