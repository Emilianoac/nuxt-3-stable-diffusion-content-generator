// /services/user-images/userImageService.ts
import type { ImageMetadata } from "@/types/image";
import type { User } from "@/types/user";

export interface GetUserImagesUseCase {
  getPaginatedUserImages(userId: string, limit?: number, lasTimeStamp?: number): Promise<ImageMetadata[]>;
  getSingleImage(userId: string, imageId: string): Promise<ImageMetadata | null>;
  subscribeToUserImages(user: User, callback: (images: ImageMetadata[]) => void): () => void;
}