import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';

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
        const { offset, limit, author_id, order, order_field, select } = req.body;

        const posts = await prisma.post.findMany({
            take: limit || 0,
            skip: offset || 0,
            where: author_id ? { author_id } : undefined,
            orderBy: {
                [order_field || 'created']: order || 'desc', // most recent by default
            },
            select: select || feedModel,
        });

        res.status(200).json({ success: true, list: posts });
    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
}
