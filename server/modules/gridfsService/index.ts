import fs from 'fs';
import {
  GridFSBucket,
  GridFSBucketWriteStreamOptions,
  ObjectId,
} from 'mongodb';
import { getDb } from 'server/shared/database';

export class GridFSService {
  uploadFile = async (
    filePath: fs.PathLike,
    filename: string,
    options: GridFSBucketWriteStreamOptions,
  ) => {
    const db = await getDb();
    const bucket = new GridFSBucket(db);
    const stream = await fs
      .createReadStream(filePath)
      .pipe(bucket.openUploadStream(filename, options) as any);

    return new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  };

  getFile = async (fileId: string | ObjectId) => {
    const db = await getDb();
    const bucket = new GridFSBucket(db);

    const downStream = bucket.openDownloadStream(new ObjectId(fileId));
    return downStream;
  };
}
