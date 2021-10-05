import { NextApiRequest, NextApiResponse } from 'next';
import { votesService } from 'server/modules/votes/services/votes.service';

async function votesHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await votesService.getAllVotes();
  res.json(result);
}

export default votesHandler;
