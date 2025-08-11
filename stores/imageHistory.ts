import { defineStore } from "pinia";
import type { GenereatedImage } from "@/services/domain/image-history/ImageHistoryService.interface";

interface State {
  recentImages: GenereatedImage[];
  isLoading: boolean;
}

export const useImageHistoryStore = defineStore("imageHistory",  {
  state: (): State => ({
    recentImages: [],
    isLoading: true,
  }),
  actions: {
    setLoadingState(loading: boolean) {
      this.isLoading = loading;
    }
  }
});