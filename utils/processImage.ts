function base64ToFile(base64: string, filename: string): File {
  const binary = atob(base64.split(",")[1]);
  const array = [];
  
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  return new File([new Uint8Array(array)], filename, { type: "image/png" });
}

async function compressImage(file: File, quality: number = 0.7): Promise<File> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Failed to create canvas context");

  const fileName = file.name.split(".")[0];
  const imageBitmap = await createImageBitmap(file);
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  ctx.drawImage(imageBitmap, 0, 0);

  const compressedBase64 = canvas.toDataURL("image/webp", quality);
  const webpBlob = await (await fetch(compressedBase64)).blob();

  return new File([webpBlob], `${fileName}.webp`, { type: "image/webp" });
}

export default async function processImage(base64: string, filename: string) {
  const file = base64ToFile(base64, filename);
  const compressedFile = await compressImage(file);
  return compressedFile;
}