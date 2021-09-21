import { NextApiRequest, NextApiResponse } from 'next';
import { candidateService } from 'server/modules/candidate/services/candidate.service';

async function candidatesHandler(req: NextApiRequest, res: NextApiResponse) {
  const applicationToAdd = req.body;
  const result = await candidateService.submitApplication(applicationToAdd);
  res.json(result);
}

export default candidatesHandler;
