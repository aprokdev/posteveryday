import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import formatDateString from '@utils/formateDateString';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            res.setHeader('Allow', 'GET');
            res.status(405).json({ sucess: false, message: 'Method Not Allowed' });
            return;
        }

        const { offset, limit, author_id, order, order_field } = req.query;

        const posts = await prisma.post.findMany({
            take: Number(limit) || 0,
            skip: Number(offset) || 0,
            where: author_id ? { author_id: Number(author_id) } : undefined,
            orderBy: {
                [order_field ? `${order_field}` : 'created']: order || 'desc', // most recent by default
            },
            select: feedModel,
        });

        const list = posts.map((post) => ({
            ...post,
            created: formatDateString(post.created.toISOString()),
        }));

        res.status(200).json({ success: true, data: { list } });
    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
}
