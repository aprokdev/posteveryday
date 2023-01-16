import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserEntity } from '../../utils/user-entity';

const prisma = new PrismaClient();

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, first_name, last_name, password } = JSON.parse(body);
        const user = new UserEntity({ email, first_name, last_name });
        await user.setPassword(password, 10);
        await prisma.user.create({ data: user });
        res.status(200).json({ body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
