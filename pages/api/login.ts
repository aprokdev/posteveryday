import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserEntity } from '../../utils/user-entity';

const prisma = new PrismaClient();

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = JSON.parse(body);
        const response = await prisma.user.findUnique({ where: { email } });
        if (!response) {
            return res.status(401).json({ message: 'There is no user with provided email' });
        }
        const user = new UserEntity(response);
        const isPasswordValid = await UserEntity.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Provided password doesn't match" });
        }
        console.log(process.env.SECRET);

        const secret = process.env.SECRET;

        if (!secret) {
            throw new Error('secret is absent in .env file');
        }
        if (secret) {
            const jwt = await sign(email, secret, { algorithm: 'HS256' });
            res.status(200).json({ success: true, jwt });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
