import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { parseFormData } from '@utils/parseFormData';
import { createReadStream, promises } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getLoginSession(req);

        const { fields, files } = await parseFormData(req);

        const buffer = createReadStream(files.image.filepath);

        const { title, html, id } = fields;

        // const result = await uploadS3Image(buffer, files.image.originalFilename);
        // console.log('result: ', result);

        const result = await prisma.post.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                html,
                image: files.image.newFilename,
            },
        });

        // await promises.rm(files.image.filepath);
        res.status(200).json({ success: true, data: result });
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
