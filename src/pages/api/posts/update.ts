import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';
import { ParseFieldsAndS3Upload } from '@utils/ParseFieldsAndS3Upload';
import formatDateString from '@utils/formateDateString';
import { deleteS3File } from './delete';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).json({ sucess: false, message: 'Method Not Allowed' });
            return;
        }

        const { title, html, imageURL, id } = await ParseFieldsAndS3Upload(req);

        // ==== id field required in request! These 2 checks prevent undesirable behaviour
        // if image file was sent, it will be put in s3 anyways,
        // so after check we should remove it from bucket:
        if (id === 'undefined' && imageURL) {
            const url = new URL(imageURL);
            const key = url.pathname.slice(1); // key: '/images/filename.jpg' => 'images/filename.jpg'
            await deleteS3File(key);
            res.status(405).json({ sucess: false, message: 'id field is required' });
            return;
        }
        if (id === 'undefined' && !imageURL) {
            res.status(405).json({ sucess: false, message: 'id field is required' });
            return;
        }
        // ====

        // Don't forget to remove previous image from S3 bucket, if it had been passed
        if (id !== 'undefined' && imageURL) {
            const previousPost = await prisma.post.findFirst({ where: { id: Number(id) } });
            const url = new URL(previousPost.image);
            const key = url.pathname.slice(1); // key: '/images/filename.jpg' => 'images/filename.jpg'
            await deleteS3File(key);
        }

        const result = await prisma.post.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                html,
                html_preview: html.slice(0, 340),
                image: imageURL,
            },
        });

        res.status(200).json({
            success: true,
            data: { ...result, created: formatDateString(result.created.toISOString()) },
        });
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
