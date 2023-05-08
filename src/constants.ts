export const IMAGE_STATUS = {
  NONE: 'NONE',
  PROCESSING: 'PROCESSING',
  DONE: 'DONE',
  ERROR: 'ERROR',
} as const

export type ImageStatus = keyof typeof IMAGE_STATUS

export const IMAGE_CONVERT_OUTPUT_FORMAT = ['avif', 'gif', 'jpeg', 'png', 'tiff', 'webp'] as const

export type ImageConvertOutputFormat = typeof IMAGE_CONVERT_OUTPUT_FORMAT[number]
