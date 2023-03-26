import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { createSessionCookie, createToken } from '@backend/auth';
import { localStrategy } from '@backend/passport-local';
import passport from 'passport';

function authenticate(method, req, res): Promise<Object> {
    return new Promise((resolve, reject) => {
        passport.authenticate(method, { session: false }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        })(req, res);
    });
}

passport.use(localStrategy);

export default nextConnect()
    .use(passport.initialize())
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const user: any = await authenticate('local', req, res);
            // session is the payload to save in the token, it may contain basic info about the user
            const { id, email, first_name, last_name, role } = user;
            const session = { id, email, first_name, last_name, role };
            const token = await createToken(session);
            const sessionCookie = createSessionCookie(token);
            res.setHeader('Set-Cookie', sessionCookie);
            res.status(200).send({ success: true });
        } catch (error) {
            if (error.message === 'Provided credentials are invalid') {
                console.log();
                res.status(422).json({ success: false, message: error.message });
                return;
            }
            res.status(500).json({ success: false, message: error.message });
        }
    });
