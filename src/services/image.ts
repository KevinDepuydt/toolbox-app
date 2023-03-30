import sharp from 'sharp'
import { Buffer } from 'buffer'


const SHARP_CONFIG = {
  jpeg: { quality: 70 },
  png: { quality: 70, compressionLevel: 8 },
  webp: { quality: 70 }
}

export class ImageService {
  async compress(file: Express.Multer.File): Promise<Buffer> {
    const image = sharp(file.buffer)
    const { format } = await image.metadata()

    switch (format) {
      case 'jpeg':
      case 'jpg':
        image.jpeg(SHARP_CONFIG.jpeg)
        break
      case 'png':
        image.png(SHARP_CONFIG.png)
        break
      case 'webp':
        image.webp(SHARP_CONFIG.webp)
        break
      default:
        console.log(`format ${format} not handled for image compression`)
        break
    }

    return image.toBuffer()
  }
}

const service = new ImageService()

export default service
