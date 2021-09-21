import { NextApiRequest, NextApiResponse } from 'next';
import { candidateService } from 'server/modules/candidate/services/candidate.service';

async function likesHandler(req: NextApiRequest, res: NextApiResponse) {
  const { candidateId, voterId } = req.body;
  const result = await candidateService.addDislike(candidateId, voterId);
  res.json(result);
}

export default likesHandler;
