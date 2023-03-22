import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@backend/index';
import { genPassword } from '@utils/user-entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).json({ sucess: false, message: 'Method Not Allowed' });
            return;
        }
        const { email, first_name, last_name, password } = req.body;
        const existedUser = await prisma.user.findUnique({ where: { email } });

        if (existedUser) {
            return res
                .status(401)
                .json({ sucess: false, message: 'User with provided email is already exist' });
        }

        const { salt, hash } = genPassword(password);

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    first_name,
                    last_name,
                    hash,
                    salt,
                    role: 'user',
                    image: '',
                },
            });
            console.log('user', user);
            if (user) {
                res.status(200).json({ success: true });
            }
        } catch (error) {
            res.json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
