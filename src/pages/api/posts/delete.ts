import { NextApiRequest, NextApiResponse } from 'next';
import { prisma, s3 } from '@backend/index';
import { IAPIResponse } from '@frontend/api/types';

function deleteS3File(key): Promise<IAPIResponse> {
    return new Promise((res, rej) => {
        s3.deleteObject({ Bucket: 'posteveryday', Key: key }, function (err, data) {
            if (err) {
                rej(err);
            } else {
                res({ success: true });
            }
        });
    });
}

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

        // delete image from S3 bucket before deleting post:
        const imageURL = new URL(req?.body?.image);
        const key = imageURL.pathname.slice(1); // key: '/images/filename.jpg' => 'images/filename.jpg'
        await deleteS3File(key);

        await prisma.post.delete({ where: { id: Number(req?.body?.id) } });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
}
