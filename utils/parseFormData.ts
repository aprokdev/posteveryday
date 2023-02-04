import { NextApiRequest } from 'next';
import { IncomingForm } from 'formidable';

export interface IParseFromDataRes {
    fields: IncomingForm.Fields;
    files: IncomingForm.Files;
    uploadDir: string;
}

export async function parseFormData(
    req: NextApiRequest,
    uploadDir?: string
): Promise<IParseFromDataRes> {
    return new Promise((res, rej) => {
        new IncomingForm({ keepExtensions: true, uploadDir }).parse(req, (err, fields, files) => {
            if (err) {
                rej(err);
            }
            res({ fields, files, uploadDir });
        });
    });
}
