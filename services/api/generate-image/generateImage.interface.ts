import type { NewImageParams, ImageMetadata, NewImageParamsUser} from "@/types/image";

export type GenerateImageAPI = (form: NewImageParamsUser, authToken: string) => Promise<{ base64: string, seed: number }>;
