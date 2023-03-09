import { NextApiRequest } from 'next';
import { IncomingForm } from 'formidable';
import path from 'path';

export interface IParseFromDataRes {
    fields: IncomingForm.Fields;
    files: IncomingForm.Files;
}

export async function parseFormData(req: NextApiRequest): Promise<IParseFromDataRes> {
    return new Promise((res, rej) => {
        const localImages = `${path.join(process.cwd(), '/public')}`;

        new IncomingForm({
            keepExtensions: true,
            uploadDir: localImages,
        }).parse(req, (err, fields, files) => {
            if (err) {
                rej(err);
            }
            res({ fields, files });
        });
    });
}
