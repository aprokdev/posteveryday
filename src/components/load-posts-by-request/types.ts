import { IAPIResponse, IPostData } from '@frontend/api/types';

export type CardsLoaderParams = { limit: number; offset: number };

export interface IPostsLoaderProps {
    cardsLoader: (params: CardsLoaderParams) => Promise<IAPIResponse>;
    initialPosts: IPostData[];
    amount: number;
}
