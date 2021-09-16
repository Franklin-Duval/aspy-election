import { ObjectId } from 'mongodb';
import { getDb } from 'server/shared/database';
import { DATABASE_COLLECTIONS } from 'server/shared/databaseCollections';
import { PostEntity } from '../entities/post.entity';

export class PostsDbService {
  getAll = async () => {
    return await (await getDb())
      .collection<PostEntity>(DATABASE_COLLECTIONS.POST)
      .find({})
      .toArray();
  };

  addPost = async (post: Omit<PostEntity, '_id'>) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.POST)
      .insertOne(post);
  };

  getPost = async (postId: string) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.POST)
      .findOne({ _id: new ObjectId(postId) });
  };
}

export const postsDbService = new PostsDbService();
