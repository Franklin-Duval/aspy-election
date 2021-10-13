import { VoterEntity } from 'server/modules/voter/entities/voter.entity';
import { VoteEntity } from 'server/modules/votes/entities/votes.entity';
import { ErrorType } from 'server/shared/customTypes';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
import { customFetch, responseHandler } from 'src/shared/customFetch';

export const fetchVoters = (): Promise<VoterEntity[]> => {
  return customFetch.get(API_ROUTES.VOTERS.GET_ALL);
};

export const addVoter = (
  voterToCreate: VoterEntity,
): Promise<VoterEntity | ErrorType> => {
  let formData = new FormData();
  formData.append('name', voterToCreate.name);
  formData.append('surename', voterToCreate.surename);
  formData.append('contact', voterToCreate.contact);
  formData.append('email', voterToCreate.email);
  formData.append('matricule', voterToCreate.matricule);
  formData.append('department', voterToCreate.department);
  formData.append('level', voterToCreate.level);
  formData.append('password', voterToCreate.password as string);
  formData.append('secret_code', '1505');
  formData.append('image', voterToCreate.image);

  return fetch(API_ROUTES.VOTERS.ADD, {
    method: 'post',
    body: formData,
  }).then(responseHandler);
};

export const addLike = (candidateId: string, voterId: string) => {
  const data = { candidateId, voterId };
  return customFetch.post(API_ROUTES.CANDIDATES.ADD_LIKE, data);
};

export const addDislike = (candidateId: string, voterId: string) => {
  const data = { candidateId, voterId };
  return customFetch.post(API_ROUTES.CANDIDATES.ADD_DISLIKE, data);
};

export const addVotes = (votes: VoteEntity[]) => {
  return customFetch.post(API_ROUTES.VOTES.ADD_MULTIPLE, votes);
};
