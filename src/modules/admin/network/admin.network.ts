import { PostEntity } from 'server/modules/post/entities/post.entity';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
import { customFetch } from 'src/shared/customFetch';

export const fetchPosts = (): Promise<PostEntity[]> => {
  return customFetch.get(API_ROUTES.POSTS.GET_ALL);
};

export const addPost = (postToCreate: PostEntity): Promise<PostEntity> => {
  return customFetch.post(API_ROUTES.POSTS.ADD, postToCreate);
};
