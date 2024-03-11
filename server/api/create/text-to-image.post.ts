import {z} from "zod"

interface ImageParams {
  steps: string,
  seed: number
  cfg_scale: number
  prompt: string,
  negative_prompt?: string,
  style_preset: string
}

const ImageParamsSchema = z.object({
  steps: z
    .number()
    .max(20, "The maximum number of steps is 20"),
  seed: z.number(),
  cfg_scale: z
    .number()
    .max(35, "The maximum value for cfg_scale is 35"),
  prompt: z
    .string()
    .refine((val) => val.trim().length > 0, { message: "Prompt cannot be empty"}),
  negative_prompt: z
    .string()
    .optional(),
  style_preset: z.string()
})

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const requestBody = await readBody<ImageParams>(event)

  console.log(requestBody)

  // Validate the request body
  const validatedParams = ImageParamsSchema.safeParse(requestBody)
  if (!validatedParams.success) {
    const errors = validatedParams.error.errors.map((error) => `Error: ${error.message}`).join(", ")
    throw createError({
      status: 400,
      message: errors ,
    })
  }
  
  async function createImage(params: ImageParams) {
    const apiEngine = "stable-diffusion-xl-1024-v1-0"
    const apiHost = "https://api.stability.ai"
    const apiKey = runtimeConfig.stableDiffusionKey

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }

    const body = {
      steps: params.steps,
      width: 1024,
      height: 1024,
      seed: params.seed,
      samples: 1,
      cfg_scale: params.cfg_scale,
      text_prompts: [
        {
          text: params.prompt,
          weight: 0.5
        },
        {
          text: params.negative_prompt ? params.negative_prompt : "ugly, deformed, poor quality, blurry, bad anatomy",
          weight: -1
        }
      ],
      style_presets: params.style_preset
    }

      const res = await fetch(`${apiHost}/v1/generation/${apiEngine}/text-to-image`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(body)
      })
  
      const data: TextToImageResponse = await res.json()
      return data
  }

  const data = await createImage(requestBody)
  return {
    image: data.artifacts[0].base64,
    seed: data.artifacts[0].seed
  } 
})