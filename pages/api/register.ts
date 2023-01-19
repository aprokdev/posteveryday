import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../../utils/user-entity';

const prisma = new PrismaClient();

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, first_name, last_name, password } = JSON.parse(body);
        const user = new UserEntity({ email, first_name, last_name });
        const salt = process.env.SALT;
        if (!salt) {
            throw new Error('SALT was not provided in config');
        }
        await user.setPassword(password, Number(salt));
        const result = await prisma.user.create({ data: user });
        if (result.id) {
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        res.status(400).json({ body: JSON.stringify({ message: error.message }) });
    }
}
