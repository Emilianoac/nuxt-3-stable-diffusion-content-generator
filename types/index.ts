
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
    model: string,
    style_preset: string
  }
}


export interface ImageData {
  url: string
  id: string,
  timestamp: number
  name: string
  prompt: string
  negative_prompt?: string
  steps: number
  cfg_scale: number
  samples: number
  dimensions: string
  model: string
  seed: number,
}

