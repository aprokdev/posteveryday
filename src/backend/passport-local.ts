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
        console.log('passport user', user);

        if (user && validatePassword(password, user.hash, user.salt)) {
            done(null, user);
        } else {
            done(new Error('Invalid username and password combination'));
        }
    } catch (error) {
        done(error);
    }
});
