import { NextApiRequest, NextApiResponse } from 'next';
import { candidateService } from 'server/modules/candidate/services/candidate.service';

const candidatesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const candidates = await candidateService.getAllCandidates();
  res.json(candidates);
};

export default candidatesHandler;
