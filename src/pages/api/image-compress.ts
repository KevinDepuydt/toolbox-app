import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  file: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('API:Image compress handler call');
  res.status(200).json({ file: 'path to compressed file' });
}
