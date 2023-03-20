import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            res.setHeader('Allow', 'GET');
            res.status(405).json({
                data: null,
                error: 'Method Not Allowed',
            });
            return;
        }
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
