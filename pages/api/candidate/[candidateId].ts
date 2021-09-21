import { NextApiRequest, NextApiResponse } from 'next';
import { candidateService } from 'server/modules/candidate/services/candidate.service';

const candidatesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let candidateId = req.query.candidateId.toString();
  const candidate = await candidateService.getCandidate(candidateId);
  res.json(candidate);
};

export default candidatesHandler;
