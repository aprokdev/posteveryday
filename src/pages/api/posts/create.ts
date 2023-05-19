import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import formatDateString from '@utils/formateDateString';
import { parseFieldsAndS3Upload } from '@utils/parseFieldsAndS3Upload';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).json({ sucess: false, message: 'Method Not Allowed' });
            return;
        }
        const session = await getLoginSession(req);

        const { title, html, imageURL } = await parseFieldsAndS3Upload(req);
        const result = await prisma.post.create({
            data: {
                title,
                html,
                html_preview: html.slice(0, 340),
                image: imageURL,
                author_id: Number(session.id),
                author_firstname: session.first_name,
                author_lastname: session.last_name,
            },
        });
        res.status(201).json({
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
