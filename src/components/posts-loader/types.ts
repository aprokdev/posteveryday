import { IAPIResponse, IPostData } from '@frontend/api/types';

type CardsLoaderParams = { limit: number; offset: number };

export interface IPostsLoaderProps {
    cardsLoader: (params: CardsLoaderParams) => IAPIResponse;
    initialPosts: IPostData[];
    amount: number;
}
