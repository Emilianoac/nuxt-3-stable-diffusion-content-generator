export async function compressBase64(base64: string, quality: number = 0.7): Promise<string> {
  if (!isValidBase64Image(base64)) {
    throw new Error("Invalid base64 image string");
  }

  const response = await fetch(base64);
  const blob = await response.blob();
  const file = new File([blob], "image.webp", { type: "image/webp" });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Failed to create canvas context");

  const imageBitmap = await createImageBitmap(file);
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  ctx.drawImage(imageBitmap, 0, 0);

  const compressedBase64 = canvas.toDataURL("image/webp", quality);
  return compressedBase64;
}

function isValidBase64Image(str: string) {
  if (!/^data:image\/(png|jpeg|jpg|webp|gif);base64,/.test(str)) {
    return false;
  }
  
  const base64Data = str.split(',')[1];
  try {
    atob(base64Data);
    return true;
  } catch {
    return false;
  }
}
