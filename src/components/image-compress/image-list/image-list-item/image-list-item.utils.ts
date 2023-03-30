export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function fileToDataUrl(file: File): Promise<string> {
  const base64Src = await fileToBase64(file)
  return `data:${file.type};base64,${base64Src}`
}

export function compareFilesSize(inputFile: File, outputFile: File): number {
  return Math.floor((outputFile.size - inputFile.size) / inputFile.size * 100);
}

export function formatFileSize(file: File): string {
  let i = file.size === 0 ? 0 : Math.floor(Math.log(file.size) / Math.log(1024));
  return `${(file.size / Math.pow(1024, i)).toFixed(2)}${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
}
