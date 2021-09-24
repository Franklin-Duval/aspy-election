import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { Application } from 'server/shared/customTypes';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
import { customFetch, responseHandler } from 'src/shared/customFetch';

export const fetchCandidates = (): Promise<CandidateEntity[]> => {
  return customFetch.get(API_ROUTES.CANDIDATES.GET_ALL);
};

export const addCandidate = (candidateToCreate: CandidateEntity) => {
  let formData = new FormData();
  formData.append('name', candidateToCreate.name);
  formData.append('surename', candidateToCreate.surename);
  formData.append('contact', candidateToCreate.contact);
  formData.append('email', candidateToCreate.email);
  formData.append('matricule', candidateToCreate.matricule);
  formData.append('department', candidateToCreate.department);
  formData.append('level', candidateToCreate.level);
  formData.append('password', candidateToCreate.password as string);
  formData.append('secret_code', '1505');
  formData.append('image', candidateToCreate.image);

  return fetch(API_ROUTES.CANDIDATES.ADD, {
    method: 'post',
    body: formData,
  }).then(responseHandler);
};

export const submitApplication = (application: Application) => {
  return customFetch.post(API_ROUTES.CANDIDATES.APPLICATION, application);
};

export const getCandidate = (candidateId: string): Promise<CandidateEntity> => {
  return customFetch.get(API_ROUTES.CANDIDATES.GET_ONE(candidateId));
};
