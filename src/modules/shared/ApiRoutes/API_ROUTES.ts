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
    ADD_LIKE: '/api/candidate/addLike',
    ADD_DISLIKE: '/api/candidate/addDislike',
  },
  POSTS: {
    GET_ALL: '/api/post',
    ADD: '/api/post/add',
  },
  VOTES: {
    GET_ALL: '/api/vote',
    ADD_MULTIPLE: '/api/vote/addMultiple',
  },
  IMAGES: {
    GET: (imageId: string) => `/api/images/${imageId}`,
  },
  ASPIANS: {
    GET_ALL: '/api/aspian',
    ADD: '/api/aspian/add',
  },
};
