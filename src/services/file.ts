export class FileService {
  async base64ToFile(base64: string, type: string, filename: string, suffix: string): Promise<File> {
    const imageDataUrl = `data:${type};base64,${base64}`
    const res = await fetch(imageDataUrl)
    const blob = await res.blob()
    const { name, ext } = this.parseFilename(filename, type)
    return new File([blob], `${name}${suffix}.${ext}`,{ type })
  }

  parseFilename(filename: string, type: string): FileParts {
    const parts = filename.split('.')
    const ext = parts.pop() || type.replace('image/', '')
    const name = parts.join('.')
    return { name, ext }
  }
}

const service = new FileService()

export default service
