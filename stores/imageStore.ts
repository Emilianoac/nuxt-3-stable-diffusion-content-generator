import { defineStore } from "pinia";
import type { NewImageParamsUser, GeneratedImage } from "@/types/image";

interface State {
  isLoading: boolean;
  error: { status: boolean; message: string };
  currentImage: {
    data: GeneratedImage | null;
  };
  imageGeneration: {
    newImageParams: NewImageParamsUser;
    generatedImage: GeneratedImage
  };
  imageHistory: {
    data: GeneratedImage[];
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
    error: { status: false, message: "" },

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

    // Global Actions
    updateLoadingState(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    updateError(status: boolean, message: string) {
      this.error.status = status;
      this.error.message = message;
    },

    // Current Image Actions
    updateCurrentImage(data: GeneratedImage | null) {
      this.currentImage.data = data;
    },

    updateCurrentImageSaved(isSaved: boolean) {
      if (this.currentImage.data) {
        this.currentImage.data.isSaved = isSaved;
      }
    },

    // Image Generation Actions
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

      this.currentImage.data = this.imageGeneration.generatedImage;
    },

    // Image History Actions
    updateImageHistory(data: GeneratedImage[]) {
      this.imageHistory.data = data;
    },
    updateImageHistoryLoadingState(isLoading: boolean) {
      this.imageHistory.isLoading = isLoading;
    },
  }
});