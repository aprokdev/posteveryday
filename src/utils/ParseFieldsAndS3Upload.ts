import { NextApiRequest } from 'next';
import { s3 } from '@backend/index';
import busboy from 'busboy';

export interface IParseUploadResponse {
    title?: string;
    html?: string;
    imageURL?: string;
    id?: string;
}

// This function parses form fields as well as send image file to S3 bucket.
// You should always remember, that if file has been passed in formData, it will be loaded on S3 anyways.
// In case, when image file is absent, it returns only fields

export function ParseFieldsAndS3Upload(req: NextApiRequest): Promise<IParseUploadResponse> {
    return new Promise((res, rej) => {
        const bb = busboy({ headers: req.headers });

        let isFile, imageURL;

        const fields = {};

        bb.on('file', (name, file, info) => {
            isFile = true;

            const { filename, mimeType } = info;
            const upload = s3.upload({
                Bucket: `${process.env.AWS_S3_BUCKET_NAME}/images`,
                Key: `${new Date().toISOString().replace(/\.|\:|-/g, '')}-${filename}`,
                Body: file,
                ContentType: mimeType,
            });

            upload.send((err, data) => {
                if (err) {
                    rej(err);
                }
                imageURL = data.Location;
                res({ imageURL, ...fields });
            });
        });

        bb.on('field', (name, val, info) => {
            fields[`${name}`] = val;
        });

        bb.on('finish', (val) => {
            if (!isFile) {
                res(fields);
            }
            if (isFile && imageURL) {
                res({ imageURL, ...fields });
            }
        });

        req.pipe(bb);
    });
}
