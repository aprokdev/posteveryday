import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream, promises } from 'fs';
import { parseFormData } from '../../../utils/parseFormData';
import { uploadS3Image } from '../../../utils/uploadToS3';

// import InversifyContainer from 'backend/inversify-config';
// import TYPES from 'backend/inversify-types';
// import { IDatabase } from 'backend/services/database/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { files } = await parseFormData(req);
        const buffer = createReadStream(files.image.filepath);

        const result = await uploadS3Image(buffer, files.image.originalFilename);
        console.log('result: ', result);

        await promises.rm(files.image.filepath);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
    }
}

// in Next.js environment request automatically parsed by bodyParser,
// so you have to turn it off:
export const config = {
    api: {
        bodyParser: false,
    },
};
