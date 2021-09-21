export const ROUTES = {
  HOME_PAGE: '/',
  VOTER: {
    REGISTRATION: '/voter/registration',
    CANDIDATE_LIST: '/voter/candidateList',
    CANDIDATE_DETAILS: (candidateId: string) =>
      `/voter/candidateDetails/${candidateId}`,
  },
  CANDIDATE: {
    REGISTRATION: '/candidate/registration',
    APPLICATION: '/candidate/application',
  },
};
