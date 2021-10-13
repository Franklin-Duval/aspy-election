import { aspianService } from 'server/modules/aspians/services/aspian.service';
import { EncryptionService } from 'server/modules/ecryptionService/encryptionService';
import { postsService } from 'server/modules/post/services/post.service';
import { Application, ErrorType } from 'server/shared/customTypes';
import { CandidateEntity } from '../entities/candidate.entity';
import { candidateDbService } from './candidatedb.service';

class CandidateService {
  getAllCandidates = async () => {
    return await candidateDbService.getAll();
  };

  addCandidate = async (candidate: CandidateEntity) => {
    const isAspain = await this.checkAspain(candidate.matricule);
    if (!isAspain) {
      return {
        message:
          'Your are not registered as an Aspian. Contact the administrator first, inorder to be registered\nWhatsapp: 690115022',
      } as ErrorType;
    }
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
        message:
          'A user with this matricule already exists! Verify the matricule entered. In case of any problem, contact the administrator\nWhatsapp: 690115022',
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

  getCandidate = async (candidateId: string) => {
    return await candidateDbService.getCandidate(candidateId);
  };

  submitApplication = async (application: Application) => {
    const candidate = await this.getCandidate(application._id);
    if (candidate.planOfAction) {
      return {
        message: 'Your application has already been registered',
      } as ErrorType;
    } else {
      const result = await candidateDbService.submitApplication(application);
      await postsService.incrementNumberCandidates(application.post);
      return result;
    }
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

  finishVote = async (candidateId: string) => {
    return await candidateDbService.finishVote(candidateId);
  };

  checkAspain = async (candidateMatricule: string) => {
    const result = await aspianService.getAspianByMatricule(candidateMatricule);
    if (result) {
      return true;
    }
    return false;
  };

  checkCandidateExists = async (matricule: string) => {
    const voter = await candidateDbService.getCandidateByMatricule(matricule);
    if (voter) {
      return true;
    }
    return false;
  };

  getCandidateByMatricule = async (matricule: string) => {
    return await candidateDbService.getCandidateByMatricule(matricule);
  };
}

export const candidateService = new CandidateService();
