import { ObjectId } from 'mongodb';
import { getDb } from 'server/shared/database';
import { DATABASE_COLLECTIONS } from 'server/shared/databaseCollections';
import { AspianEntity } from '../entities/aspian.entity';

export class AspainDbService {
  getAll = async () => {
    return await (await getDb())
      .collection<AspianEntity>(DATABASE_COLLECTIONS.ASPIAN)
      .find({})
      .toArray();
  };

  addAspian = async (aspian: Omit<AspianEntity, '_id'>) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.ASPIAN)
      .insertOne(aspian);
  };

  getAspian = async (aspianId: string) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.ASPIAN)
      .findOne({ _id: new ObjectId(aspianId) });
  };

  getAspianByMatricule = async (matricule: string) => {
    return await (await getDb())
      .collection(DATABASE_COLLECTIONS.ASPIAN)
      .findOne({ matricule: matricule });
  };
}

export const aspianDbService = new AspainDbService();
