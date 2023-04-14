import { IAPIResponse, IGetPostsParams, IPostData } from '@frontend/api/types';

export interface IPostsLoaderProps {
    cardsLoader: (params: IGetPostsParams) => Promise<IAPIResponse>;
    initialPosts: IPostData[];
    amount: number;
}
