import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';

export default async function user(req, res) {
    try {
        const session = await getLoginSession(req);
        if (session) {
            const existedUser = await prisma.user.findUnique({ where: { email: session.email } });
            res.status(200).json({ user: existedUser });
        } else {
            res.status(500).json({ message: 'You shold be authenticated to perform that action' });
        }
    } catch (error) {
        res.status(500).json({ message: 'You shold be authenticated to perform that action' });
    }
}
