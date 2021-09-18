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

  addCandidate = async (candidate: Omit<CandidateEntity, '_id'>) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .insertOne(candidate);
  };

  getCandidate = async (candidateId: string) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .findOne({ _id: new ObjectId(candidateId) });
  };
}

export const candidateDbService = new CandidateDbService();
