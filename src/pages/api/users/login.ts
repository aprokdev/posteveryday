import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { setLoginSession } from '@backend/auth';
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
            const user = await authenticate('local', req, res);
            // session is the payload to save in the token, it may contain basic info about the user
            const session = { ...user };

            // creates token for session and sets it as cookie-header in response
            await setLoginSession(res, session);

            res.status(200).send({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
