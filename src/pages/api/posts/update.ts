import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { parseFormData } from '@utils/parseFormData';
import { createReadStream, promises } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).json({
                data: null,
                error: 'Method Not Allowed',
            });
            return;
        }
        // const { fields, files } = await parseFormData(req);

        // const buffer = createReadStream(files.image.filepath);

        // const { title, html, id } = fields;

        // const result = await uploadS3Image(buffer, files.image.originalFilename);
        // console.log('result: ', result);

        // const result = await prisma.post.update({
        //     where: {
        //         id: Number(id),
        //     },
        //     data: {
        //         title,
        //         html,
        //         html_preview: html.slice(0, 340),
        //         image: files.image ? files.image.newFilename : undefined,
        //     },
        // });

        // await promises.rm(files.image.filepath);
        // res.status(200).json({ success: true, data: result });
        res.status(500).json({ success: false, message: "Doesn't work temporary" });
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
