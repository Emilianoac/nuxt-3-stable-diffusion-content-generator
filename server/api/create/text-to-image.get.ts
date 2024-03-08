export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const apiEngine = "stable-diffusion-xl-1024-v1-0"
  const apiHost = "https://api.stability.ai"
  const apiKey = runtimeConfig.stableDiffusionKey

  async function createImage() {

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }

    const body = {
      steps: 20,
      width: 1024,
      height: 1024,
      seed: 39430,
      samples: 1,
      cfg_scale: 7,
      text_prompts: [
        {
          text: "A cute cat, anime style",
        }
      ]
    }

    const res = await fetch(`${apiHost}/v1/generation/${apiEngine}/text-to-image`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body)
    })

    const data: TextToImageResponse = await res.json()
    return data
  }

  const data = await createImage()

  return {image: data.artifacts[0].base64} 
})