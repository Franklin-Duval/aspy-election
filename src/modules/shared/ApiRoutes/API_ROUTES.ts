export const API_ROUTES = {
  VOTERS: {
    GET_ALL: '/api/voter',
    GET_ONE: (voterId: string) => `/api/voter/${voterId}`,
    ADD: '/api/voter/add',
  },
  CANDIDATES: {
    GET_ALL: '/api/candidate',
    GET_ONE: (candidateId: string) => `/api/candidate/${candidateId}`,
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
