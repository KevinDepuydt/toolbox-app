import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import imageService from '@services/image'


type Data = {
  base64?: string,
  type?: string,
  error?: string,
}

export const config = {
  api: {
    bodyParser: false
  },
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const files = await parseFiles(req, res)
    const { outputFormat } = req.body
    if (files.length > 0) {
      const buffer = await imageService.convert(files[0], outputFormat)
      return res.status(200).json({ type: `image/${outputFormat}`, base64: buffer.toString('base64') })
    }

    return res.status(400).json({ error: 'No image have been uploaded' })
  } catch (e: any) {
    return res.status(400).json({ error: e.message })
  }
}
