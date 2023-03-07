import { validatePassword } from '@utils/user-entity';
import Local from 'passport-local';
import { prisma } from './index';

// import { findUser, validatePassword } from './user';
prisma.$connect();

export const localStrategy = new Local.Strategy({ usernameField: 'email' }, async function (
    email,
    password,
    done
) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            done(new Error('Invalid email'));
        }
        const isPasswordValid = validatePassword(password, user.hash, user.salt);
        if (user && !isPasswordValid) {
            done(new Error('Invalid password'));
        }
        if (user && isPasswordValid) {
            done(null, user);
        }
    } catch (error) {
        done(error);
    }
});
