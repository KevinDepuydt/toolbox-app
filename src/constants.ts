export enum ImageStatus {
  NONE,
  PROCESSING,
  DONE,
  ERROR,
}

export const IMAGE_CONVERT_OUTPUT_FORMAT = ['avif', 'gif', 'jpeg', 'png', 'tiff', 'webp'] as const

export type ImageConvertOutputFormat = typeof IMAGE_CONVERT_OUTPUT_FORMAT[number]
