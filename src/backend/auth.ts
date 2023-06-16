import { NextApiResponse } from 'next';
import Iron from '@hapi/iron';
import { parse, serialize } from 'cookie';
import { IncomingMessage } from 'http';
import { ISession } from './types';

const TOKEN_NAME = 'posteveryday_token';
const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const MAX_AGE = 60 * 60 * 8; // 8 hours in seconds

export async function createToken(session: ISession): Promise<string> {
    // Create a session object with a max age that we can validate later
    const sessionObj = { ...session, createdAt: Date.now(), maxAge: MAX_AGE };
    return await Iron.seal(sessionObj, TOKEN_SECRET, Iron.defaults);
}

export function createSessionCookie(token: string): string {
    return serialize(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
}

export interface IParseCookiesArg extends IncomingMessage {
    cookies?: Partial<{ [key: string]: string }>;
}

export function parseCookies(req: IParseCookiesArg): { token: string } | {} {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies;
    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie;
    return parse(cookie || '');
}

export function getTokenCookie(req: IncomingMessage): string {
    const cookies = parseCookies(req);
    return cookies[TOKEN_NAME];
}

export async function getLoginSession(req: IncomingMessage): Promise<ISession> {
    const token = getTokenCookie(req);
    if (!token) return;

    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
    const expiresAt = session.createdAt + session.maxAge * 1000;

    // Validate the expiration date of the session
    if (Date.now() > expiresAt) {
        throw new Error('Session expired');
    }
    return session;
}

export function cleanTokenCookie(res: NextApiResponse): void {
    const cookie = serialize(TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
}
