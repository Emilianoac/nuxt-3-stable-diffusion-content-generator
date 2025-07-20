import { defineStore } from "pinia"; 
import type {User } from "@/types/user";

export const useUserStore = defineStore("user", {
  state: () => ({ 
    user: null as User | null,
    isLoading: true,
  }),
  actions: {
    updateUser (user: User | null) {
      this.user = user;
      this.isLoading = false;
    },
    updateLoading (isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
})
