import type { ImageData } from "@/types/index";

export interface DBService {
  saveUserProfile(id: string, profileData: any): Promise<void>;
  addUserImage(imageData: ImageData, userId: string): Promise<void>;
}