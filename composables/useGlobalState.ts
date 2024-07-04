import type { ImageData, GeneratedImage } from "@/types/index";
import type { User } from "firebase/auth";

const globalState = reactive({
  user: null as User | null,
  loading: true,
  images: {} as Record<string, ImageData>,
  formImage: {
    prompt: undefined as string | undefined,
    negative_prompt: undefined as string | undefined,
    style_preset: "none" as string | undefined,
    seed: 0,
    steps: 15,
    cfg_scale: 7,
  },
  generatedImage: {
    data: null,
    isPending: false,
    error: {
      status: false,
      message: '',
    }
  } as GeneratedImage,
});
export default function () {
  return { globalState };
}