import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@backend/auth';
import { prisma, s3 } from '@backend/index';
import { parseFormData } from '@utils/parseFormData';
import busboy from 'busboy';
// import { uploadS3Image } from '@utils/uploadToS3';
import { createReadStream, promises } from 'fs';

// import InversifyContainer from 'backend/inversify-config';
// import TYPES from 'backend/inversify-types';
// import { IDatabase } from 'backend/services/database/types';

export interface IBBPromiseResponse {
    title: string;
    html: string;
    imageURL?: string;
}

function S3uploadAndParseFields(req): Promise<IBBPromiseResponse> {
    return new Promise((res, rej) => {
        const bb = busboy({ headers: req.headers });

        let title, html, imageURL;

        bb.on('file', (name, file, info) => {
            const { filename, mimeType } = info;
            const upload = s3.upload({
                Bucket: `${process.env.AWS_S3_BUCKET_NAME}/images`,
                Key: filename,
                Body: file,
                ContentType: mimeType,
            });

            upload.send((err, data) => {
                if (err) {
                    rej(err);
                }
                imageURL = data.Location;
                if (title && html && imageURL) {
                    res({ title, html, imageURL });
                }
            });
        });

        bb.on('field', (name, val, info) => {
            if (name === 'title') {
                title = val;
            }
            if (name === 'html') {
                html = val;
            }
        });

        bb.on('finish', (val) => {
            if (title && html && imageURL) {
                res({ title, html, imageURL });
            }
        });

        req.pipe(bb);
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
        const session = await getLoginSession(req);

        const response = await S3uploadAndParseFields(req);
        const { title, html, imageURL } = response;
        const result = await prisma.post.create({
            data: {
                title,
                html,
                html_preview: html.slice(0, 340),
                image: imageURL,
                author_id: session.id,
                author_firstname: session.first_name,
                author_lastname: session.last_name,
            },
        });
        res.status(200).json({ success: true, data: result });
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
