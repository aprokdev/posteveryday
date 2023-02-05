import { NextApiRequest } from 'next';
import { IncomingForm } from 'formidable';

export interface IParseFromDataRes {
    fields: IncomingForm.Fields;
    files: IncomingForm.Files;
}

export async function parseFormData(req: NextApiRequest): Promise<IParseFromDataRes> {
    return new Promise((res, rej) => {
        new IncomingForm({ keepExtensions: true }).parse(req, (err, fields, files) => {
            if (err) {
                rej(err);
            }
            res({ fields, files });
        });
    });
}
