import { IUser } from '@utils/user-entity';
import { ReactNode } from 'react';

export interface ILayoutProps {
    user: IUser;
    isUserFetching: boolean;
    children: ReactNode;
}
