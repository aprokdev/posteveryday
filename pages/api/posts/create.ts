import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream, promises } from 'fs';
import { parseFormData } from 'utils/parseFormData';
import { uploadS3Image } from 'utils/uploadToS3';

// import InversifyContainer from 'backend/inversify-config';
// import TYPES from 'backend/inversify-types';
// import { IDatabase } from 'backend/services/database/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const uploadDir = `${process.cwd()}/temp`;
        await promises.mkdir(uploadDir);
        const { files } = await parseFormData(req, uploadDir);
        const filePath = `${uploadDir}/${files.image.newFilename}`;

        const buffer = createReadStream(filePath);

        const result = await uploadS3Image(buffer, files.image.originalFilename);
        const { Location: imgURL } = result;
        console.log('result: ', result);
        console.log('imgURL: ', imgURL);

        await promises.rm(filePath);
        await promises.rmdir(uploadDir);

        res.status(200).json({ success: true, uploadDir, secret: process.env.secrets });
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error.message,
            secrets: process.env.secrets,
            test: true,
        });
    }
}

// in Next.js environment request automatically parsed by bodyParser,
// so you have to turn it off:
export const config = {
    api: {
        bodyParser: false,
    },
};
