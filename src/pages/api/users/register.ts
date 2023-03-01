import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, prisma } from '@prisma/client';
// import InversifyContainer from 'backend/inversify-config';
// import TYPES from 'backend/inversify-types';
// import { IDatabase } from 'backend/services/database/types';
import { UserEntity } from '@utils/user-entity';
import { database } from 'backend';

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, first_name, last_name, password } = body;
        // const database = InversifyContainer.get<IDatabase>(TYPES.IDatabase);
        const response = await database.user.findUnique({ where: { email } });
        if (response) {
            return res
                .status(401)
                .json({ sucess: false, message: 'User with provided email is already exist' });
        }
        const user = new UserEntity({ email, first_name, last_name });
        await user.setPassword(password, Number(process.env.SALT));
        const result = await database.user.create({ data: user });
        if (result?.id) {
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
    }
}
