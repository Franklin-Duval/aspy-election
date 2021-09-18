import { EncryptionService } from 'server/modules/ecryptionService/encryptionService';
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
}

export const candidateService = new CandidateService();
