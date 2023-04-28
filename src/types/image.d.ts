type ImageState = {
  id: string
  inputFile: File
  outputFile?: File
  outputFileSizeDiff?: number
  status: ImageStatus
  error?: string
}

interface ImageCompressState extends ImageState {}

interface ImageConvertState extends ImageState {
  outputFormat?: ImageConvertOutputFormat
}
