export interface GeneratedImage {
  data: EndpointResponse | null,
  isPending: boolean
  error: {
    status: boolean
    message: string
  }
}

export interface EndpointResponse {
  base64: string,
  name: string
  timestamp: number
  params: {
    prompt: string
    negative_prompt: string
    seed: number
    steps: number
    cfg_scale: number
    dimensions: string
    samples: number
    model: string
  }
}


export interface ImageData {
  url: string
  timestamp: number
  name: string
  prompt: string
  negative_prompt: string
  style_preset: string
  steps: number
  cfg_scale: number
  samples: number
  dimensions: string
  model: string
  seed: number,
}

