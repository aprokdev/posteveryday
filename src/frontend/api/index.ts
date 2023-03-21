import makeReqBody from '@utils/make-request-body';
import { ILoginFormInputs } from '@components/login-form';
import { IRegisterFormInputs } from '@components/register-form';
import { API_PATHS } from './paths';
import { IAPIPostResponse, IAPIResponse, IDeleteParams, IPostData } from './types';

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

export async function get(path: string, data, options?: { headers: Headers }) {
    const headers = options?.headers || {};
    try {
        const body = makeReqBody(data);
        const res = await fetch(path, {
            method: 'GET',
            body,
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8',
                ...headers,
            }),
        });
        return res.json();
    } catch (error) {
        console.error(`get() error: ${error.message}`);
        return error;
    }
}

export async function loginUser(data: ILoginFormInputs): Promise<IAPIResponse> {
    return await post(API_PATHS.login, data);
}

export async function registerUser(data: IRegisterFormInputs): Promise<IAPIResponse> {
    return await post(API_PATHS.register, data);
}

export async function createPost(data: IPostData): Promise<IAPIPostResponse> {
    try {
        const formData = new FormData();
        formData.append('image', data?.image);
        formData.append('title', data?.title);
        formData.append('html', data?.html);

        const res = await fetch(API_PATHS.createPost, {
            method: 'POST',
            body: formData,
        });
        return await res.json();
    } catch (error) {
        console.error(`createPost error: ${error.message}`);
        return error;
    }
}

export async function updatePost(data: IPostData): Promise<IAPIPostResponse> {
    try {
        const formData = new FormData();
        if (data?.image) {
            formData.append('image', data?.image);
        }
        formData.append('title', data?.title);
        formData.append('html', data?.html);
        formData.append('id', data?.id);

        const res = await fetch(API_PATHS.updatePost, {
            method: 'POST',
            body: formData,
        });
        return await res.json();
    } catch (error) {
        console.error(`updatePost error: ${error.message}`);
        return error;
    }
}

export async function deletePost({ id, image }: IDeleteParams): Promise<IAPIPostResponse> {
    return await post(API_PATHS.deletePost, { id, image });
}
