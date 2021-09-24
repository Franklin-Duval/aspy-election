import { candidateService } from 'server/modules/candidate/services/candidate.service';
import { EncryptionService } from 'server/modules/ecryptionService/encryptionService';
import { ErrorType } from 'server/shared/customTypes';
import { VoterEntity } from '../entities/voter.entity';
import { voterDbService } from './voterdb.service';

class VoterService {
  getAllVoters = async () => {
    return await voterDbService.getAll();
  };

  addVoter = async (voter: VoterEntity) => {
    // check if voter with matricule exists
    const voterExists = await this.checkVoterExists(voter.matricule);
    if (voterExists) {
      return {
        message: 'A user with this matricule already exists!!!',
      } as ErrorType;
    }
    // check if candidate with matricule exists
    const candidateExists = await candidateService.checkCandidateExists(
      voter.matricule,
    );
    if (candidateExists) {
      return {
        message: 'A user with this matricule already exists!!!',
      } as ErrorType;
    }
    const voterToAdd = {
      ...voter,
      password: await EncryptionService.hashPassword(voter.password as string),
    };
    const instertedVoter = await voterDbService.addVoter(voterToAdd);
    return await this.getVoter(instertedVoter.insertedId.toHexString());
  };

  checkVoterExists = async (matricule: string) => {
    const voter = await voterDbService.getVoterByMatricule(matricule);
    if (voter) {
      return true;
    }
    return false;
  };

  getVoter = async (voterId: string) => {
    return await voterDbService.getVoter(voterId);
  };

  authenticate = async (matricule: string, password: string) => {
    const voter = await voterDbService.getVoterByMatricule(matricule);
    if (voter) {
      const isPasswordTheSame = await EncryptionService.comparePassword(
        password,
        voter.password as string,
      );
      if (isPasswordTheSame) {
        return voter;
      }
    }
    return undefined;
  };

  finishVote = async (voterId: string) => {
    return await voterDbService.finishVote(voterId);
  };
}

export const voterService = new VoterService();
