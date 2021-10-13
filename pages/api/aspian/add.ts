import { NextApiRequest, NextApiResponse } from 'next';
import { aspianService } from 'server/modules/aspians/services/aspian.service';

async function aspiansHandler(req: NextApiRequest, res: NextApiResponse) {
  const aspianToAdd = req.body;
  const result = await aspianService.addAspian(aspianToAdd);
  res.json(result);
}

export default aspiansHandler;
