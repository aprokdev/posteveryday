import { validatePassword } from '@utils/user-entity';
import Local from 'passport-local';
import { prisma } from './index';

const options = { usernameField: 'email' };

export const localStrategy = new Local.Strategy(options, async function (email, password, done) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) done(new Error("User doesn't exist"));
        const isPasswordValid = validatePassword(password, user.hash, user.salt);
        if (user && !isPasswordValid) done(new Error('Invalid password'));
        if (user && isPasswordValid) done(null, user);
    } catch (error) {
        done(error);
    }
});
