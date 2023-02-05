import { sign } from 'jsonwebtoken';

export default function signJWT(email: string, secret: string): Promise<string | Error> {
    return new Promise((res, rej) => {
        sign(
            {
                email,
                iat: Math.floor(Date.now() / 1000),
            },
            secret,
            {
                algorithm: 'HS256',
            },
            (err, token) => {
                if (err) {
                    rej(err);
                } else {
                    res(token);
                }
            }
        );
    });
}
