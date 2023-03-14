import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { parseFormData } from '@utils/parseFormData';
// import { uploadS3Image } from '@utils/uploadToS3';
import { createReadStream, promises } from 'fs';

// import InversifyContainer from 'backend/inversify-config';
// import TYPES from 'backend/inversify-types';
// import { IDatabase } from 'backend/services/database/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getLoginSession(req);

        const { fields, files } = await parseFormData(req);

        const buffer = createReadStream(files.image.filepath);

        const { title, html } = fields;

        // const result = await uploadS3Image(buffer, files.image.originalFilename);
        // console.log('result: ', result);

        // console.log(files?.image);

        console.log('html', html);
        console.log('html_preview', html.slice(0, 340));

        const result = await prisma.post.create({
            data: {
                title,
                html,
                html_preview: html.slice(0, 340),
                image: files.image.newFilename,
                author_id: session.id,
                author_firstname: session.first_name,
                author_lastname: session.last_name,
            },
        });

        // await promises.rm(files.image.filepath);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
}

// in Next.js environment request automatically parsed by bodyParser,
// so you have to turn it off:
export const config = {
    api: {
        bodyParser: false,
    },
};
