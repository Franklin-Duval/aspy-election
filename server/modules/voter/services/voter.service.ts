import { EncryptionService } from 'server/modules/ecryptionService/encryptionService';
import { VoterEntity } from '../entities/voter.entity';
import { voterDbService } from './voterdb.service';

class VoterService {
  getAllVoters = async () => {
    return await voterDbService.getAll();
  };

  addVoter = async (voter: VoterEntity) => {
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
}

export const voterService = new VoterService();
