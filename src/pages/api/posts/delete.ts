import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';
import { deleteS3File } from '@utils/deleteS3File';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'DELETE') {
            res.setHeader('Allow', 'DELETE');
            res.status(405).json({ sucess: false, message: 'Method Not Allowed' });
            return;
        }

        if (req?.body?.image === undefined) {
            res.status(405).json({ sucess: false, message: 'image field is required' });
            return;
        }

        // delete image from S3 bucket before deleting post:
        const imageURL = new URL(req?.body?.image);
        const key = imageURL.pathname.slice(1); // key: '/images/filename.jpg' => 'images/filename.jpg'
        const { success } = await deleteS3File(key);
        console.log('S3 image has deleted', success);

        await prisma.post.delete({ where: { id: Number(req?.body?.id) } });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
}
