import { IAPIResponse, IGetPostsParams, IPostData } from '@frontend/api/types';

export interface IPostsLoaderProps {
    cardsLoader: (params: IGetPostsParams) => Promise<IAPIResponse>;
    initialPosts: IPostData[];
    amount: number;
    zeroPosts?: () => void;
    initialLoad?: boolean;
}

export interface IState {
    list: IPostData[];
    offset: number;
    limit: number;
    hasMore: boolean;
    errorMessage: string;
}
