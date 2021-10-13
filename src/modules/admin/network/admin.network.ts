import { AspianEntity } from 'server/modules/aspians/entities/aspian.entity';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { VoteEntity } from 'server/modules/votes/entities/votes.entity';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
import { customFetch } from 'src/shared/customFetch';

export const fetchPosts = (): Promise<PostEntity[]> => {
  return customFetch.get(API_ROUTES.POSTS.GET_ALL);
};

export const addPost = (postToCreate: PostEntity): Promise<PostEntity> => {
  return customFetch.post(API_ROUTES.POSTS.ADD, postToCreate);
};

export const fetchVotes = (): Promise<VoteEntity[]> => {
  return customFetch.get(API_ROUTES.VOTES.GET_ALL);
};

export const fetchAspians = (): Promise<AspianEntity[]> => {
  return customFetch.get(API_ROUTES.ASPIANS.GET_ALL);
};

export const addAspian = (aspian: AspianEntity): Promise<AspianEntity> => {
  return customFetch.post(API_ROUTES.ASPIANS.ADD, aspian);
};
