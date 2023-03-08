import { cleanTokenCookie } from '@backend/auth';

export default async function logout(req, res) {
    cleanTokenCookie(res);
    res.writeHead(302, { Location: '/' });
    res.end();
}
