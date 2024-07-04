import { initAdmin } from "@/server/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { imageSchema, type ImageSchema } from "@/schemas/imageSchema";

export default defineEventHandler( async (event) => {
  // Get the runtime configuration for environment variables
  const runtimeConfig = useRuntimeConfig();
  // Get the request body
  const requestBody = await readBody<ImageSchema>(event);
  // Get firebase id token from the request headers
  const idToken = getRequestHeader(event, "Authorization")?.split(' ')[1];

  // Initialize the Firebase Admin app
  await initAdmin();
  const auth = getAuth();

  // Return an error if the idToken is missing
  if (!idToken) {
    throw createError({
      status: 401,
      message: "Authorization header is missing",
    });
  }

  // Return an error if the idToken is invalid
  await auth.verifyIdToken(idToken).then((decodedToken) => {

  }).catch((error) => {
    throw createError({
      status: 401,
      message: "Invalid authorization token",
    });
  });


  // Validate the request body with zod schema
  const validatedParams = imageSchema.safeParse(requestBody);
  if (!validatedParams.success) {
    const errors = validatedParams.error.errors.map((error) => `Error: ${error.message}`).join(", ")
    throw createError({
      status: 400,
      message: errors,
    })
  }
  
  /**
   * Create an image using the stability AI API
   */
  async function createImage(params: ImageSchema) {
    const apiEngine = "stable-diffusion-xl-1024-v1-0";
    const apiHost = "https://api.stability.ai";
    const apiKey = runtimeConfig.stableDiffusionKey;

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };

    const body = {
      steps: params.steps,
      width: 1024,
      height: 1024,
      seed: params.seed,
      samples: 1,
      cfg_scale: params.cfg_scale,
      text_prompts: [
        { text: params.prompt, weight: 0.5 },
        { text: params.negative_prompt ? 
          params.negative_prompt : 
          "ugly, deformed, poor quality, blurry, bad anatomy", 
          weight: -1
        }
      ],
      style_presets: params.style_preset
    };

    const res = await fetch(`${apiHost}/v1/generation/${apiEngine}/text-to-image`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.name === "content_moderation") {
        throw createError({ 
          status: 400, 
          message: "The prompt contains inappropriate content, please try again."
        })
      } else {
        throw createError({ 
          status: 500, 
          message: "An error occurred, please try again."
        })
      }
    }

    return data;
  }

  const data = await createImage(requestBody);
  const timestamp = Date.now();

  const response = {
    base64: `data:image/png;base64,${data.artifacts[0].base64}`,
    name: `image-${timestamp}`,
    timestamp: timestamp,
    params: {
      prompt: requestBody.prompt,
      negative_prompt: requestBody.negative_prompt,
      seed: data.artifacts[0].seed,
      steps: requestBody.steps,
      cfg_scale: requestBody.cfg_scale,
      dimensions: "1024x1024",
      samples: 1,
      model: "stable-diffusion-xl-1024-v1-0",
    },
  }

  return response;
})