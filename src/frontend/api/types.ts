export interface IAPIResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export interface IPostData {
    image: string;
    title: string;
    html: string;
    id: string;
    html_preview?: string;
    created: string;
    author_firstname: string;
    author_lastname: string;
}

export interface IFullPostData extends IPostData {
    author_id?: number;
}

export interface ICreatePostParams {
    image: string;
    title: string;
    html: string;
}

export interface IUpdatePostParams {
    image?: string;
    title: string;
    html: string;
    id: string;
}

export interface IAPIPostResponse {
    success: boolean;
    data?: IPostData;
    message?: string;
}

export interface IDeleteParams {
    id: string;
    image: string;
}

export interface IGetPostsParams {
    offset: number;
    limit: number;
    author_id?: number;
    order?: string;
    order_field?: string;
    select?: IFullPostData;
}
