import { IPostData } from '@frontend/api/types';
import { IPostPageData } from '@frontend/api/types';
import { IUser } from '@utils/user-entity';

export interface IAddPostProps {
    user: IUser;
}

export interface IFeedPageProps {
    user: IUser;
    posts: IPostData[];
    error?: string;
}

export interface IPostPageProps {
    user: IUser;
    data: IPostPageData;
    error?: string;
}

export interface IReducerState {
    read: boolean;
    preview: boolean;
    edit: boolean;
}
