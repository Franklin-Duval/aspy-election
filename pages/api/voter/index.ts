import { NextApiRequest, NextApiResponse } from 'next';
import { voterService } from 'server/modules/voter/services/voter.service';

const votersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const voters = await voterService.getAllVoters();
  res.json(voters);
};

export default votersHandler;
