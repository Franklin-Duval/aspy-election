export const ROUTES = {
  HOME_PAGE: '/',
  VOTER: {
    REGISTRATION: '/voter/registration',
    CANDIDATE_LIST: '/voter/candidateList',
    VOTING: '/voter/voting',
    CANDIDATE_DETAILS: (candidateId: string) =>
      `/voter/candidateDetails/${candidateId}`,
  },
  CANDIDATE: {
    REGISTRATION: '/candidate/registration',
    APPLICATION: '/candidate/application',
  },
  ADMIN: {
    POST: '/admin/post',
    USER_PAGE: '/admin/users',
    RESULT_PAGE: '/admin/results',
    ASPIANS: '/admin/aspians',
  },
};
