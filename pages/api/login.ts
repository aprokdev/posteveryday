import { NextApiRequest, NextApiResponse } from 'next';
import { database } from 'backend';
// import InversifyContainer from 'backend/inversify-config';
// import TYPES from 'backend/inversify-types';
// import { IDatabase } from 'backend/services/database/types';
import signJWT from 'utils/sign-jwt';
import { UserEntity } from '../../utils/user-entity';

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = body;
        // const database = InversifyContainer.get<IDatabase>(TYPES.IDatabase);
        const response = await database.user.findUnique({ where: { email } });
        if (!response) {
            return res
                .status(401)
                .json({ sucess: false, message: 'There is no user with provided email' });
        }

        const isPasswordValid = await UserEntity.comparePassword(password, response.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ sucess: false, message: "Provided password doesn't match" });
        }

        const secret = process.env.SECRET;
        const jwt = await signJWT(email, secret);
        res.status(200).json({ success: true, jwt });
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
    }
}
