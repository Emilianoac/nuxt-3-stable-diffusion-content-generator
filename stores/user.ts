import { defineStore } from "pinia"; 
import processImage from "@/utils/processImage";
import type { ImageData, EndpointResponse } from "@/types/index";
import type { User } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({ 
    user: null as User | null,
    userImages: [] as ImageData[],
    isLoading: true,
    generatedImage: null as EndpointResponse | null,
    isgeneratedImageSaved: false,
    error: {
      status: false,
      message: ""
    },
    newImage:{
      prompt: undefined as string | undefined,
      negative_prompt: undefined as string | undefined,
      style_preset: "none" as string | undefined,
      seed: 0,
      steps: 15,
      cfg_scale: 7,
    }
  }),
  getters: {},
  actions: {

    async register(email: string, password: string) {
      try {
        this.isLoading = true;
        const firebaseProvider = this.firebaseProvider();
        const res = await firebaseProvider.register(email, password);
        if (!res) throw new Error("Failed to register");
        this.user = res.user;
        return res;
      } catch (error: any) {
        this.error = { status: true, message: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    async login(email: string, password: string) {
      try {
        this.isLoading = true;
        const firebaseProvider = this.firebaseProvider();
        const res = await firebaseProvider.login(email, password);
        if (!res) throw new Error("Failed to login");
        this.user = res.user;
        return res;
      } catch (error: any) {
        this.error = { status: true, message: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        const firebaseProvider = this.firebaseProvider();
        await firebaseProvider.logout();
        this.user = null;
        navigateTo("/");
      } catch (error: any) {
        this.error = { status: true, message: error.message };
      }
    },

    async getUser() {
      if (this.user) return;
      try {
        const firebaseProvider = this.firebaseProvider()
        const userData = await firebaseProvider.getUser();
        this.user = userData;
      } catch (error: any) {
        this.error = { status: true, message: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    async addImageToStore() {
      if (!this.generatedImage || !this.user) return;
      try {
        const firebaseProvider = this.firebaseProvider();
        const {name, base64} = this.generatedImage;

        const generatedImage = await processImage(base64, name);
        let generatedImageURL = await firebaseProvider.addFileToStorage(generatedImage, this.user.uid);

        return { name: generatedImage.name, url: generatedImageURL};
      } catch (error: any) {
        this.error = { status: true, message: error.message };
      }
    },

    async saveImageinDatabase() {
      if (!this.user || !this.generatedImage) return;
      try {
        this.isLoading = true;
        const firebaseProvider = this.firebaseProvider();
        
        let generatedImageData = await this.addImageToStore();
        if (!generatedImageData) throw new Error("Failed to save image to storage");

        let generatedImage: ImageData = { 
          ...this.generatedImage.params as ImageData, 
          url:  generatedImageData.url as string,
          name: generatedImageData.name as string,
          timestamp: this.generatedImage.timestamp as number
        };

        await firebaseProvider.addFileToDatabase(generatedImage, this.user.uid);
        this.isgeneratedImageSaved = true;
        
        // Generate a toast message to notify the user
        const toast = useToast();
        toast.add({ title: "Image saved successfully", timeout: 2000});
      } catch (error: any) {
        this.error = { status: true, message: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    subscribeToUserImages() {
      if (!this.user) return;
      this.isLoading = true;
      const firebaseProvider = this.firebaseProvider();
      const unsubscribe = firebaseProvider.subscribeToUserImages(this.user, (images) => {
        this.userImages = images; 
        this.isLoading = false;
      });
      return unsubscribe; 
    },

    async getImageById(imageId: string) {
      if (!this.user) return;
      try {
        this.isLoading = true;
        const firebaseProvider = this.firebaseProvider();
        return await firebaseProvider.getSingleImage(this.user.uid, imageId);
      } catch (error: any) {
        this.error = { status: true, message: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    firebaseProvider() {
      const { FirebaseProvider } = useFirebase();
      return new FirebaseProvider();
    }
  },
})
