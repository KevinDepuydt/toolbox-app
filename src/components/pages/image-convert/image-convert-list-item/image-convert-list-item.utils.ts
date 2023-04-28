export function compareFilesSize(inputFile: File, outputFile: File): string {
  const comparison = Math.floor((outputFile.size - inputFile.size) / inputFile.size * 100)
  return comparison > 0 ? `+${comparison}` : `${comparison}`
}

export function formatFileSize(file: File): string {
  let i = file.size === 0 ? 0 : Math.floor(Math.log(file.size) / Math.log(1024));
  return `${(file.size / Math.pow(1024, i)).toFixed(2)}${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
}
