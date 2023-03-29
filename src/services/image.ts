import sharp from 'sharp'
import { Buffer } from 'buffer'


export class ImageService {
  async compress(file: Express.Multer.File): Promise<Buffer> {
    const sharpFile = sharp(file.buffer)
    const { format } = await sharpFile.metadata()

    switch (format) {
      case 'jpeg':
      case 'jpg':
        sharpFile.jpeg({ quality: 70 })
        break
      case 'png':
        sharpFile.png({ compressionLevel: 7 })
        break
      case 'webp':
        sharpFile.webp({ quality: 70 })
        break
      default:
        console.log(`format ${format} not handled for image compression`)
        break
    }

    return sharpFile.toBuffer()
  }
}

const service = new ImageService()

export default service
