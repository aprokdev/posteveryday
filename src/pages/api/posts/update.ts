import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';
import { deleteS3File } from '@utils/deleteS3File';
import { HTTPError405, HTTPError422 } from '@utils/errors';
import formatDateString from '@utils/formateDateString';
import { parseFieldsAndS3Upload } from '@utils/parseFieldsAndS3Upload';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'PUT') {
            res.setHeader('Allow', 'PUT');
            throw new HTTPError405("'id' field is required");
        }

        const { title, html, imageURL, id } = await parseFieldsAndS3Upload(req);

        // ==== id field required in request! These 2 checks prevent undesirable behaviour
        // if image file was sent, it will be put in s3 anyways,
        // so after check we should remove it from bucket:
        const isIdField = id !== 'undefined' && id !== '' && id !== undefined;
        if (!isIdField && imageURL) {
            const url = new URL(imageURL);
            const key = url.pathname.slice(1); // key: '/images/filename.jpg' => 'images/filename.jpg'
            const { success } = await deleteS3File(key);
            throw new HTTPError422("'id' field is required");
        }
        if (!isIdField && !imageURL) {
            throw new HTTPError422("'id' field is required");
        }
        if (!isIdField) {
            throw new HTTPError422("'id' field is required");
        }
        // ====

        // Don't forget to remove previous image from S3 bucket, if it had been passed
        const previousPost = await prisma.post.findFirst({ where: { id: Number(id) } });
        if (previousPost && imageURL) {
            const url = new URL(previousPost.image);
            const key = url.pathname.slice(1); // key: '/images/filename.jpg' => 'images/filename.jpg'
            const { success } = await deleteS3File(key);
        }

        const result = await prisma.post.update({
            where: {
                id: Number(id),
            },
            data: {
                title: title.length > 0 ? title : undefined,
                html: html.length > 0 ? html : undefined,
                html_preview: html.length > 0 ? html.slice(0, 340) : undefined,
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
