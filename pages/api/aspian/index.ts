import { NextApiRequest, NextApiResponse } from 'next';
import { aspianService } from 'server/modules/aspians/services/aspian.service';

const aspiansHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const aspians = await aspianService.getAllAspians();
  res.json(aspians);
};

export default aspiansHandler;
