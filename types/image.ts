export interface NewImageParamsBase {
  model: string;
  samples: number;
  dimensions: string;
}

export interface NewImageParamsUser {
  prompt: string;
  negative_prompt?: string;
  seed: number;
  steps: number;
  cfg_scale: number;
}

export type NewImageParams = NewImageParamsBase & NewImageParamsUser;

export interface ImageMetadata extends NewImageParams {
  id: string
  name: string
  url: string
  timestamp: number
}

export interface GeneratedImage {
  isGenerated: boolean;
  isSaved: boolean;
  base64?: string;
  localStorageId?: string;
  data: NewImageParams;
}
