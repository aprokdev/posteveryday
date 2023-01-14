import { NextApiRequest, NextApiResponse } from 'next';

export default function handler({ body }: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ body });
}
