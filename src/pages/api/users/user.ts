import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';

export default async function user(req, res) {
    try {
        const session = await getLoginSession(req);
        const existedUser = await prisma.user.findUnique({ where: { email } });
        console.log('existedUser', existedUser);

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).end('Authentication token is invalid, please log in');
    }
}
