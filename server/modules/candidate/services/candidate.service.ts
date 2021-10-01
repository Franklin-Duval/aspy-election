import { EncryptionService } from 'server/modules/ecryptionService/encryptionService';
import { postsService } from 'server/modules/post/services/post.service';
import { Application } from 'server/shared/customTypes';
import { CandidateEntity } from '../entities/candidate.entity';
import { candidateDbService } from './candidatedb.service';

class CandidateService {
  getAllCandidates = async () => {
    return await candidateDbService.getAll();
  };

  addCandidate = async (candidate: CandidateEntity) => {
    const candidateToAdd = {
      ...candidate,
      password: await EncryptionService.hashPassword(
        candidate.password as string,
      ),
    };
    const instertedCandidate = await candidateDbService.addCandidate(
      candidateToAdd,
    );
    return await this.getCandidate(instertedCandidate.insertedId.toHexString());
  };

  getCandidate = async (candidateId: string) => {
    return await candidateDbService.getCandidate(candidateId);
  };

  submitApplication = async (application: Application) => {
    const result = await candidateDbService.submitApplication(application);
    await postsService.incrementNumberCandidates(application.post);
    return result;
  };

  addLike = async (candidateId: string, voterId: string) => {
    await candidateDbService.addLike(candidateId, voterId);
    return await this.getCandidate(candidateId);
  };

  addDislike = async (candidateId: string, voterId: string) => {
    await candidateDbService.addDislike(candidateId, voterId);
    return await this.getCandidate(candidateId);
  };

  authenticate = async (matricule: string, password: string) => {
    const candidate = await candidateDbService.getCandidateByMatricule(
      matricule,
    );
    if (candidate) {
      const isPasswordTheSame = await EncryptionService.comparePassword(
        password,
        candidate.password as string,
      );
      if (isPasswordTheSame) {
        return candidate;
      }
    }
    return undefined;
  };

  addNumberVotes = async (candidateId: string) => {
    return await candidateDbService.addNumberVotes(candidateId);
  };
}

export const candidateService = new CandidateService();
