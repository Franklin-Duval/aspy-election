import { ObjectId } from 'mongodb';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { Application } from 'server/shared/customTypes';
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
    const connection = await getDb();
    const candidate = (await connection
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .findOne({ _id: new ObjectId(candidateId) })) as CandidateEntity;

    const post = (await connection
      .collection(DATABASE_COLLECTIONS.POST)
      .findOne({ _id: new ObjectId(candidate.post) })) as PostEntity;
    candidate.post = post.name;
    return candidate;
  };

  submitApplication = async (application: Application) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .updateOne(
        { _id: new ObjectId(application._id) },
        {
          $set: {
            manifesto: application.manifesto,
            planOfAction: application.planOfAction,
            post: application.post,
          },
        },
      );
  };
}

export const candidateDbService = new CandidateDbService();
