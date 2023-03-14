export interface IAPIResponse {
    success: boolean;
    message?: string;
}

export interface IPostData {
    image: string;
    title: string;
    html: string;
    id?: string;
    html_preview?: string;
    created?: string;
    author_id?: number;
    author_firstname?: string;
    author_lastname?: string;
}

export interface IAPIPostResponse {
    success: boolean;
    data?: IPostData;
    message?: string;
}
