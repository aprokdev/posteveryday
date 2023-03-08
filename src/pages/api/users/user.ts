import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';

export default async function user(req, res) {
    try {
        const session = await getLoginSession(req);
        const existedUser = await prisma.user.findUnique({ where: { email: session.email } });
        res.status(200).json({ user: existedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
