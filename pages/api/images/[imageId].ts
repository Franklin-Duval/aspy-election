import { NextApiRequest, NextApiResponse } from 'next';
import { GridFSService } from 'server/modules/gridfsService';

async function imagesHandler(req: NextApiRequest, res: NextApiResponse) {
  let imageId = req.query.imageId as string;
  const downStream = await new GridFSService().getFile(imageId);
  res.setHeader('Content-Type', 'image/jpeg');
  downStream.pipe(res);
}

export default imagesHandler;
