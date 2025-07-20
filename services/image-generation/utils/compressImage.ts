export async function compressImage(file: File, quality: number = 0.7): Promise<File> {
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