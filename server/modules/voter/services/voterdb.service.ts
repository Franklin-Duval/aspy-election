import { ObjectId } from 'mongodb';
import { getDb } from 'server/shared/database';
import { DATABASE_COLLECTIONS } from 'server/shared/databaseCollections';
import { VoterEntity } from '../entities/voter.entity';

export class VoterDbService {
  getAll = async () => {
    return await (await getDb())
      .collection<VoterEntity>(DATABASE_COLLECTIONS.VOTER)
      .find({})
      .toArray();
  };

  addVoter = async (voter: Omit<VoterEntity, '_id'>) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.VOTER)
      .insertOne(voter);
  };

  getVoter = async (voterId: string) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.VOTER)
      .find({ _id: new ObjectId(voterId) });
  };
}

export const voterDbService = new VoterDbService();
