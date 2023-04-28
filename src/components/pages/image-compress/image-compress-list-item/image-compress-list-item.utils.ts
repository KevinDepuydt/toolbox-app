export function formatFileSize(file: File): string {
  let i = file.size === 0 ? 0 : Math.floor(Math.log(file.size) / Math.log(1024));
  return `${(file.size / Math.pow(1024, i)).toFixed(2)}${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
}
