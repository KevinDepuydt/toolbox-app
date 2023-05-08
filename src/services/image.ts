import sharp from 'sharp'


const SHARP_COMPRESS_CONFIG = {
  jpeg: { quality: 70 },
  png: { quality: 70, compressionLevel: 8 },
  webp: { quality: 70 }
}

const SHARP_CONVERT_CONFIG = {
  avif: { lossless: true },
  gif: { quality: 70, reuse: true },
  jpeg: { quality: 70, mozjpeg: true },
  png: { quality: 70, compressionLevel: 8, palette: true },
  tiff: { quality: 70 },
  webp: { quality: 70, lossless: true }
}

export class ImageService {
  async compress(file: Express.Multer.File): Promise<Buffer> {
    const image = sharp(file.buffer)
    const { format } = await image.metadata()

    switch (format) {
      case 'jpeg':
      case 'jpg':
        image.jpeg(SHARP_COMPRESS_CONFIG.jpeg)
        break
      case 'png':
        image.png(SHARP_COMPRESS_CONFIG.png)
        break
      case 'webp':
        image.webp(SHARP_COMPRESS_CONFIG.webp)
        break
      default:
        console.log(`format ${format} not handled for image compression`)
        throw Error('Image format not supported')
        break
    }

    return image.toBuffer()
  }

  async convert(file: Express.Multer.File, outputFormat: string): Promise<Buffer> {
    const image = sharp(file.buffer)
    const { format } = await image.metadata()

    switch (outputFormat) {
      case 'avif':
        image.avif(SHARP_CONVERT_CONFIG.avif)
        break
      case 'gif':
        image.avif(SHARP_CONVERT_CONFIG.avif)
        break
      case 'jpeg':
      case 'jpg':
        image.jpeg(SHARP_CONVERT_CONFIG.jpeg)
        break
      case 'png':
        image.png(SHARP_CONVERT_CONFIG.png)
        break
      case 'tiff':
        image.tiff(SHARP_CONVERT_CONFIG.tiff)
        break
      case 'webp':
        image.webp(SHARP_CONVERT_CONFIG.webp)
        break
      default:
        console.log(`format ${format} not handled for image conversion`)
        throw Error('Image format not supported')
        break
    }

    return image.toBuffer()
  }
}

const service = new ImageService()

export default service
