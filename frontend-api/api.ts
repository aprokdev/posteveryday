import makeReqBody from '../utils/makeReqBody';

export async function login(data) {
    try {
        const body = makeReqBody(data);
        const res = await fetch('/api/login', {
            method: 'POST',
            body,
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8',
            }),
        });
        return res.json();
    } catch (error) {
        console.error(`login() error: ${error.message}`);
        return error;
    }
}
