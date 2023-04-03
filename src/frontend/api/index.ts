import makeReqBody from '@utils/make-request-body';
import { ILoginFormInputs } from '@components/login-form';
import { IRegisterFormInputs } from '@components/register-form';
import { API_PATHS } from './paths';
import {
    IAPIPostResponse,
    IAPIResponse,
    ICreatePostParams,
    IDeleteParams,
    IUpdatePostParams,
} from './types';

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

export async function deleteMethod(path: string, data, options?: { headers: Headers }) {
    const headers = options?.headers || {};
    try {
        const body = makeReqBody(data);
        const res = await fetch(path, {
            method: 'DELETE',
            body,
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8',
                ...headers,
            }),
        });
        return res.json();
    } catch (error) {
        console.error(`deleteMethod() error: ${error.message}`);
        return error;
    }
}

export async function put(path: string, data, options?: { headers: Headers }) {
    const headers = options?.headers || {};
    try {
        const body = makeReqBody(data);
        const res = await fetch(path, {
            method: 'PUT',
            body,
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8',
                ...headers,
            }),
        });
        return res.json();
    } catch (error) {
        console.error(`put() error: ${error.message}`);
        return error;
    }
}

export async function get(path: string, params: any, options?: { headers: Headers }) {
    const headers = options?.headers || {};
    const paramsStr = new URLSearchParams(params).toString();
    try {
        const res = await fetch(`${path}?${paramsStr}`, {
            method: 'GET',
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

export async function getPosts(params): Promise<IAPIResponse> {
    return await get(API_PATHS.posts, params);
}

export async function loginUser(data: ILoginFormInputs): Promise<IAPIResponse> {
    return await post(API_PATHS.login, data);
}

export async function registerUser(data: IRegisterFormInputs): Promise<IAPIResponse> {
    return await post(API_PATHS.register, data);
}

export async function createPost(data: ICreatePostParams): Promise<IAPIPostResponse> {
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

export async function updatePost(data: IUpdatePostParams): Promise<IAPIPostResponse> {
    try {
        const formData = new FormData();
        if (data?.image) {
            formData.append('image', data?.image);
        }
        formData.append('title', data?.title);
        formData.append('html', data?.html);
        formData.append('id', data?.id);

        const res = await fetch(API_PATHS.updatePost, {
            method: 'PUT',
            body: formData,
        });
        return await res.json();
    } catch (error) {
        console.error(`updatePost error: ${error.message}`);
        return error;
    }
}

export async function deletePost({ id, image }: IDeleteParams): Promise<IAPIPostResponse> {
    return await deleteMethod(API_PATHS.deletePost, { id, image });
}
