import { NextApiRequest, NextApiResponse } from 'next';
import { s3 } from 'backend';
import { IncomingForm } from 'formidable';
import { readFile } from 'fs';

// import InversifyContainer from 'backend/inversify-config';
// import TYPES from 'backend/inversify-types';
// import { IDatabase } from 'backend/services/database/types';

interface IParseFromDataRes {
    fields: IncomingForm.Fields;
    files: IncomingForm.Files;
}

function parseFormData(req: NextApiRequest): Promise<IParseFromDataRes> {
    return new Promise((res, rej) => {
        new IncomingForm().parse(req, (err, fields, files) => {
            if (err) {
                rej(err);
            }
            res({ fields, files });
        });
    });
}

function FSreadFile(file): Promise<Buffer> {
    return new Promise((res, rej) => {
        readFile(file, function (err, buffer) {
            if (err) {
                rej(err);
            }
            console.log('BUFFER', buffer instanceof Buffer);

            res(buffer);
        });
    });
}

async function uploadFile(file, path): Promise<any> {
    // const base64data = await FSreadFile(file);

    // const arrBuf = await new Response(file).arrayBuffer();
    // const buffer = Buffer.from(arrBuf);
    // const base64data = new Buffer(buffer, 'binary');

    const params = {
        Bucket: `posteveryday/${path}`, // pass your bucket name
        Key: file.originalFilename, // file will be saved as testBucket/contacts.csv
        // Body: JSON.stringify(file, null, 2),
        Body: file,
    };
    return new Promise((res, rej) => {
        s3.upload(params, function (s3Err, data) {
            if (s3Err) {
                rej(s3Err);
            }
            res(data);
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await parseFormData(req);
        const result = await uploadFile(data.files.image, 'images');
        console.log('result', result);

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
    }
}

// in Next.js environment request automatically parsed by bodyParser,
// so you have to turn it off:
export const config = {
    api: {
        bodyParser: false,
    },
};
