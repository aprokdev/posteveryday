import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../../utils/user-entity';

const prisma = new PrismaClient();

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, first_name, last_name, password } = body;
        const response = await prisma.user.findUnique({ where: { email } });
        if (response) {
            return res
                .status(401)
                .json({ sucess: false, message: 'User with provided email is already exist' });
        }
        const user = new UserEntity({ email, first_name, last_name });
        await user.setPassword(password, Number(process.env.SALT));
        const result = await prisma.user.create({ data: user });
        if (result?.id) {
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
    }
}
