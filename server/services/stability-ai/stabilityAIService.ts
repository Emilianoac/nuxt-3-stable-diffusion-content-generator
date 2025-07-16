
interface ImageParams {
  prompt: string;
  negative_prompt?: string;
  seed?: number;  
  steps: number;
  cfg_scale: number;
  style_preset?: string;
}

export async function generateImage(params: ImageParams, apiKey: string) {
  const apiEngine = "stable-diffusion-xl-1024-v1-0";
  const apiHost = "https://api.stability.ai";

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
      {text: params.prompt, weight: 0.5},
      {text: params.negative_prompt ? 
        params.negative_prompt :
        "ugly, deformed, poor quality, blurry, bad anatomy", 
         weight: -1
      }
    ],
    style_presets: params.style_preset
  }

  const res = await fetch(`${apiHost}/v1/generation/${apiEngine}/text-to-image`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (!res.ok) {
    const data = await res.json();
    if (data.name === "content_moderation") {
      throw createError({ 
        status: 400, 
        message: "The prompt contains inappropriate content, please try again."
      });
    } else {
      throw createError({ 
        status: 500, 
        message: "An error occurred, please try again."
      });
    }
  }

  return data

}