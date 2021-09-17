import { ObjectId } from 'mongodb';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { GridFSService } from 'server/modules/gridfsService';
import { VoterEntity } from 'server/modules/voter/entities/voter.entity';
import { voterService } from 'server/modules/voter/services/voter.service';
import { NextApiRequestWithFormData } from 'server/shared/customTypes';
import { ErrorFormatted } from 'server/shared/ErrorFormatted';

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({
      error: ErrorFormatted(
        501,
        'Custom',
        `Sorry something Happened! ${error.message}`,
      ),
    });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const upload = multer({ dest: '/tmp' });
apiRoute.use(upload.single('image'));

apiRoute.post(async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  const image = req.file;
  let fileUploaded = undefined;
  if (image) {
    fileUploaded = (await new GridFSService().uploadFile(
      image.path,
      image.originalname,
      {
        contentType: image.mimetype,
      },
    )) as { _id: ObjectId };
  }

  const voterToCreate = {
    ...req.body,
    creation_date: new Date().toISOString(),
    voted: false,
    image: fileUploaded?._id.toHexString(),
  } as VoterEntity;

  const result = await voterService.addVoter(voterToCreate);
  res.json(result);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
