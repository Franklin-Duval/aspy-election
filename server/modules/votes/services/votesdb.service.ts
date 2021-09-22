import { getDb } from 'server/shared/database';
import { DATABASE_COLLECTIONS } from 'server/shared/databaseCollections';
import { VoteEntity } from '../entities/votes.entity';

export class VotesDbService {
  getAll = async () => {
    return await (await getDb())
      .collection<VoteEntity>(DATABASE_COLLECTIONS.VOTE)
      .find({})
      .toArray();
  };

  addVote = async (vote: Omit<VoteEntity, '_id'>) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.VOTE)
      .insertOne(vote);
  };

  addMultipleVote = async (votes: VoteEntity[]) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.VOTE)
      .insertMany(votes as []);
  };
}

export const votesDbService = new VotesDbService();
