import { NextApiRequest, NextApiResponse } from 'next';
import { postsService } from 'server/modules/post/services/post.service';

const postsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await postsService.getAllPosts();
  res.json(posts);
};

export default postsHandler;
