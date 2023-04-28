type ImageState = {
  id: string
  inputFile: File
  outputFile?: File
  done: boolean
  error?: string
}

interface ImageCompressState extends ImageState {}

interface ImageConvertState extends ImageState {
  outputFormat?: string
}
