import { ObjectId } from 'mongodb';
import { getDb } from 'server/shared/database';
import { DATABASE_COLLECTIONS } from 'server/shared/databaseCollections';
import { CandidateEntity } from '../entities/candidate.entity';

export class CandidateDbService {
  getAll = async () => {
    return await (await getDb())
      .collection<CandidateEntity>(DATABASE_COLLECTIONS.CANDIDATE)
      .find({})
      .toArray();
  };

  addCandidate = async (voter: Omit<CandidateEntity, '_id'>) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .insertOne(voter);
  };

  getCandidate = async (voterId: string) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .find({ _id: new ObjectId(voterId) });
  };
}

export const candidateDbService = new CandidateDbService();
