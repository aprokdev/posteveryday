import { IPostData } from '@frontend/api/types';
import { IUser } from '@utils/user-entity';
import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';

export type GetServerSidePropsContext = {
    req: IncomingMessage;
    res: ServerResponse;
    params?: ParsedUrlQuery;
    query: ParsedUrlQuery;
    preview?: boolean;
    previewData?: any;
};

export interface IPageProps {
    user: IUser;
    posts: IPostData[];
    error?: string;
}
