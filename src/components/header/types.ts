import { IUser } from '@utils/user-entity';

export interface IHeaderProps {
    user: IUser;
    isUserFetching: boolean;
}
