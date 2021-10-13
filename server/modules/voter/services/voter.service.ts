import { aspianService } from 'server/modules/aspians/services/aspian.service';
import { EncryptionService } from 'server/modules/ecryptionService/encryptionService';
import { ErrorType } from 'server/shared/customTypes';
import { VoterEntity } from '../entities/voter.entity';
import { voterDbService } from './voterdb.service';

class VoterService {
  getAllVoters = async () => {
    return await voterDbService.getAll();
  };

  addVoter = async (voter: VoterEntity) => {
    const isAspain = await this.checkAspain(voter.matricule);
    if (!isAspain) {
      return {
        message:
          'Your are not registered as an Aspian. Contact the administrator first, inorder to be registered\nWhatsapp: 690115022',
      } as ErrorType;
    }
    const voterToAdd = {
      ...voter,
      password: await EncryptionService.hashPassword(voter.password as string),
    };
    const instertedVoter = await voterDbService.addVoter(voterToAdd);
    return await this.getVoter(instertedVoter.insertedId.toHexString());
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

  checkAspain = async (voterMatricule: string) => {
    const result = await aspianService.getAspianByMatricule(voterMatricule);
    if (result) {
      return true;
    }
    return false;
  };
}

export const voterService = new VoterService();
