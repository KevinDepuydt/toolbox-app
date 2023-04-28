export class FileService {
  async base64ToFile(base64: string, type: string, filename: string, suffix: string): Promise<File> {
    const imageDataUrl = `data:${type};base64,${base64}`
    const res = await fetch(imageDataUrl)
    const blob = await res.blob()
    const { name, ext } = this.parseFilename(filename, type)
    return new File([blob], `${name}${suffix}.${ext}`,{ type })
  }

  async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  parseFilename(filename: string, type: string): FileParts {
    const parts = filename.split('.')
    parts.pop() // remove extension
    const ext = type.replace('image/', '')
    const name = parts.join('.')
    return { name, ext }
  }

  compareFilesSize(fileA: File, fileB: File): number {
    return Math.floor((fileB.size - fileA.size) / fileA.size * 100)
  }
}

const service = new FileService()

export default service
