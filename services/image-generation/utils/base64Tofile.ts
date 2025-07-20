export function base64ToFile(base64: string, filename: string): File {
  const binary = atob(base64.split(",")[1]);
  const array = [];
  
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  return new File([new Uint8Array(array)], filename, { type: "image/png" });
}