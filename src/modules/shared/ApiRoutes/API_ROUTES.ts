export const API_ROUTES = {
  VOTERS: {
    GET_ALL: '/api/voter',
    ADD: '/api/voter/add',
  },
  CANDIDATES: {
    GET_ALL: '/api/candidate',
    ADD: '/api/candidate/add',
    APPLICATION: '/api/candidate/application',
  },
  POSTS: {
    GET_ALL: '/api/post',
    ADD: '/api/post/add',
  },
  IMAGES: {
    GET: (imageId: string) => `/api/images/${imageId}`,
  },
};
