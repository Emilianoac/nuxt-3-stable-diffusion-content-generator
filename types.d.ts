interface TextToImageResponse {
  artifacts: Artifact[] 
}

interface Artifact {
  base64: string,
  seed: number,
  finishReason: string
}

