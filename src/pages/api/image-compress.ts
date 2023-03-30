import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import sharp from 'sharp'
// import imageService from '@services/image'
// import { Buffer } from 'buffer'


type Data = {
  base64?: string,
  type?: string,
  error?: string,
}

export const config = {
  api: {
    bodyParser: false
  },
  type: 'experimental-background',
}

async function parseFiles(
  req: NextApiRequest & { files?: any },
  res: NextApiResponse
) {
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  const files = upload.any();

  await new Promise((resolve, reject) => {
    files(
      req as any,
      res as any,
      (result: any) => result instanceof Error ? reject(result) : resolve(result)
    );
  });

  return req.files;
}

const SHARP_CONFIG = {
  jpeg: { quality: 70 },
  png: { quality: 70, compressionLevel: 8 },
  webp: { quality: 70 }
}

async function compressImage(file: Express.Multer.File): Promise<Buffer> {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const files = await parseFiles(req, res)
    if (files.length > 0) {
      // const buffer = await imageService.compress(files[0])
      const buffer = await compressImage(files[0])
      return res.status(200).json({ type: files[0].type, base64: buffer.toString('base64') })
    }

    return res.status(400).json({ error: 'No file uploaded' })
  } catch (e: any) {
    return res.status(400).json({ error: 'Error while compressing file : ' + e.message })
  }
}
