import { defineStore } from "pinia";
import type { NewImageParamsUser, NewImageParamsBase } from "@/types/image"

interface GeneratedImage {
  isSaved: boolean;
  isGenerated: boolean;
  base64?: string;
  data: NewImageParamsUser & NewImageParamsBase;
}

const baseParams = {
  dimensions: "1024x1024",
  samples: 1,
  model: "stable-diffusion-xl-1024-v1-0",
};

interface State {
  newImageParams: NewImageParamsUser
  generatedImage: GeneratedImage;
  isLoading: boolean;
}

export const useImageGenerationStore = defineStore("imageGeneration",  {
  state: (): State => ({
    newImageParams: {
      prompt: "",
      negative_prompt: "",
      seed: 0,
      steps: 15,
      cfg_scale: 7,
      ...baseParams,
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
        ...baseParams,
      },
    },
    isLoading: false,
  }),
  actions: {
    updateGeneratedImage(base64: string, seed: number, form: NewImageParamsUser) {
      this.generatedImage = {
        isSaved: false,
        isGenerated: true,
        base64,
        data: {
          ...baseParams,
          ...form,
          seed,
        },
      }
    },
    updateLoadingState(isLoading: boolean) {
      this.isLoading = isLoading;
    }
  }
});