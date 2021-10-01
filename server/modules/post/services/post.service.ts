import { PostEntity } from '../entities/post.entity';
import { postsDbService } from './postdb.service';

class PostsService {
  getAllPosts = async () => {
    return await postsDbService.getAll();
  };
  addPost = async (post: PostEntity) => {
    const addedRoom = await postsDbService.addPost(post);
    return await this.getPost(addedRoom.insertedId.toHexString());
  };
  getPost = async (postId: string) => {
    return await postsDbService.getPost(postId);
  };
  incrementNumberCandidates = async (postId: string) => {
    return await postsDbService.incrementNumberCandidates(postId);
  };
}

export const postsService = new PostsService();
