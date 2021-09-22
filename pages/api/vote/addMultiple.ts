import { NextApiRequest, NextApiResponse } from 'next';
import { VoteEntity } from 'server/modules/votes/entities/votes.entity';
import { votesService } from 'server/modules/votes/services/votes.service';

async function votesHandler(req: NextApiRequest, res: NextApiResponse) {
  const votesToAdd = req.body as VoteEntity[];
  const result = await votesService.addMultipleVote(votesToAdd);
  res.json(result);
}

export default votesHandler;
