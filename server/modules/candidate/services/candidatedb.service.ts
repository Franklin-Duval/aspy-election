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

    if (candidate.post) {
      const post = (await connection
        .collection(DATABASE_COLLECTIONS.POST)
        .findOne({ _id: new ObjectId(candidate.post) })) as PostEntity;
      candidate.post = post.name;
      return candidate;
    }
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

  addLike = async (candidateId: string, voterId: string) => {
    const connection = await getDb();
    const candidate = (await connection
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .findOne({ _id: new ObjectId(candidateId) })) as CandidateEntity;
    let likes = candidate.likes;
    let dislikes = candidate.dislikes;
    if (!likes?.includes(voterId)) {
      if (dislikes?.includes(voterId)) {
        dislikes.splice(dislikes.indexOf(voterId), 1);
      }
      likes?.push(voterId);
    }
    return await connection
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .updateOne(
        { _id: new ObjectId(candidateId) },
        {
          $set: {
            likes: likes,
            dislikes: dislikes,
          },
        },
      );
  };

  addDislike = async (candidateId: string, voterId: string) => {
    const connection = await getDb();
    const candidate = (await connection
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .findOne({ _id: new ObjectId(candidateId) })) as CandidateEntity;
    let likes = candidate.likes;
    let dislikes = candidate.dislikes;
    if (!dislikes?.includes(voterId)) {
      if (likes?.includes(voterId)) {
        likes.splice(likes.indexOf(voterId), 1);
      }
      dislikes?.push(voterId);
    }
    return await connection
      .collection(DATABASE_COLLECTIONS.CANDIDATE)
      .updateOne(
        { _id: new ObjectId(candidateId) },
        {
          $set: {
            likes: likes,
            dislikes: dislikes,
          },
        },
      );
  };

  getCandidateByMatricule = async (matricule: string) => {
    return await (await getDb())
      .collection<CandidateEntity>(DATABASE_COLLECTIONS.CANDIDATE)
      .findOne({ matricule: matricule });
  };

  addNumberVotes = async (candidateId: string) => {
    const candidate = await this.getCandidate(candidateId);
    const numberVotes = candidate.numberVotes || 0;
    return await (await getDb())
      .collection<CandidateEntity>(DATABASE_COLLECTIONS.CANDIDATE)
      .updateOne(
        { _id: new ObjectId(candidateId) },
        { $set: { numberVotes: numberVotes + 1 } },
      );
  };

  finishVote = async (candidateId: string) => {
    return await (await getDb())
      .collection<CandidateEntity>(DATABASE_COLLECTIONS.CANDIDATE)
      .updateOne({ _id: new ObjectId(candidateId) }, { $set: { voted: true } });
  };
}

export const candidateDbService = new CandidateDbService();
