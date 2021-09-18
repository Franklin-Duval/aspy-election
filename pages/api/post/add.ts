import { NextApiRequest, NextApiResponse } from 'next';
import { postsService } from 'server/modules/post/services/post.service';

async function postsHandler(req: NextApiRequest, res: NextApiResponse) {
  const postToAdd = req.body;
  const result = await postsService.addPost(postToAdd);
  res.json(result);
}

export default postsHandler;
