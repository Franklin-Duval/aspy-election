import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DB_URL as string);

export async function getDb() {
  await client.connect();
  return client.db(process.env.DB_NAME);
}
