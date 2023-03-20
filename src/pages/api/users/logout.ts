import { cleanTokenCookie } from '@backend/auth';

export default async function logout(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        res.status(405).json({
            data: null,
            error: 'Method Not Allowed',
        });
        return;
    }
    cleanTokenCookie(res);
    res.writeHead(302, { Location: '/' });
    res.end();
}
