import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await prisma.post.delete({
            where: {
                id: Number(req?.body?.id),
            },
        });

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
}
