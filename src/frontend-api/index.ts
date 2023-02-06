import { ILoginFormInputs } from '../components/login-form';
import { IRegisterFormInputs } from '../components/register-form';
import makeReqBody from '../utils/make-request-body';
import { API_PATHS } from './paths';
import { IAPIResponse } from './types';

export async function post(path: string, data, options?: { headers: Headers }) {
    const headers = options?.headers || {};
    try {
        const body = makeReqBody(data);
        const res = await fetch(path, {
            method: 'POST',
            body,
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8',
                ...headers,
            }),
        });
        return res.json();
    } catch (error) {
        console.error(`post() error: ${error.message}`);
        return error;
    }
}

export async function loginUser(data: ILoginFormInputs): Promise<IAPIResponse> {
    return await post(API_PATHS.login, data);
}

export async function registerUser(data: IRegisterFormInputs): Promise<IAPIResponse> {
    return await post(API_PATHS.register, data);
}
