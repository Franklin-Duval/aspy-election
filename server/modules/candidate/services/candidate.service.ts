import { EncryptionService } from 'server/modules/ecryptionService/encryptionService';
import { Application, ErrorType } from 'server/shared/customTypes';
import { CandidateEntity } from '../entities/candidate.entity';
import { candidateDbService } from './candidatedb.service';

class CandidateService {
  getAllCandidates = async () => {
    return await candidateDbService.getAll();
  };

  addCandidate = async (candidate: CandidateEntity) => {
    // check if voter with matricule exists
    const candidateExists = await this.checkCandidateExists(
      candidate.matricule,
    );
    if (candidateExists) {
      return {
        message: 'A user with this matricule already exists!!!',
      } as ErrorType;
    }
    // check if candidate with matricule exists
    const voterExists = await candidateService.checkCandidateExists(
      candidate.matricule,
    );
    if (voterExists) {
      return {
        message: 'A user with this matricule already exists!!!',
      } as ErrorType;
    }
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

  checkCandidateExists = async (matricule: string) => {
    const voter = await candidateDbService.getCandidateByMatricule(matricule);
    if (voter) {
      return true;
    }
    return false;
  };

  getCandidate = async (candidateId: string) => {
    return await candidateDbService.getCandidate(candidateId);
  };

  getCandidateByMatricule = async (matricule: string) => {
    return await candidateDbService.getCandidateByMatricule(matricule);
  };

  submitApplication = async (application: Application) => {
    const candidate = await this.getCandidate(application._id);
    if (candidate.post) {
      return {
        message: 'Your application has already been submitted!!!',
      } as ErrorType;
    }
    return await candidateDbService.submitApplication(application);
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
