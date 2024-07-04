

import type { GeneratedImage } from "@/types/index";

export default async function saveImage(generatedImage: GeneratedImage) {
  const { globalState } = useGlobalState();
  // Return if image is already being saved
  if (globalState.savingImage.status) return;

  // Return if no image data is found
  const generatedImageData = generatedImage.data;
  if (!generatedImageData) {
    globalState.generatedImage.error.status = true;
    globalState.generatedImage.error.message = "No image data found";
    return;
  }
  
  // Destructure the generated image data
  const { name, base64, timestamp, params } = generatedImageData;
  
  try {
    const toast = useToast()
    globalState.savingImage.isPending = true;

    const { addToStorage, addToDatabase } = useFirebase();

    // compress image and convert to File
    const file = await compressImage(base64, name);

    if (!file) throw new Error("Failed to compress image");

    // Add to Firebase storage
    const firebaseStorageURL = await addToStorage(file, name);
    if (!firebaseStorageURL) throw new Error("Failed to save image to Firebase storage");

    // Create new image object
    const newImage = {
      ...params,
      url: firebaseStorageURL,
      name,
      timestamp,
    };

    // Add to Firebase database
    await addToDatabase(newImage);
    globalState.savingImage.status = true;
    toast.add({ title: "Image saved successfully", timeout: 2000});

  } catch (error: any) {
    globalState.generatedImage.error.status = true;
    globalState.generatedImage.error.message = error.message;
  } finally {
    globalState.savingImage.isPending = false;
  }
}

async function compressImage(base64: string , filename: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to create canvas context");
  }

  const binary = atob(base64.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  const file = new Blob([new Uint8Array(array)], { type: "image/png" });
  const imageBitmap = await createImageBitmap(file);

  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  ctx.drawImage(imageBitmap, 0, 0);

  const compressedBase64 = canvas.toDataURL("image/webp", 0.7);
  const webpBlob = await (await fetch(compressedBase64)).blob();
  const webpFile = new File([webpBlob], filename, { type: "image/webp" });

  return webpFile;
}

