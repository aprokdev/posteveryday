import { IPostPageData } from '@frontend/api/types';
import { IUser } from '@utils/user-entity';

export interface IReadModeProps {
    user: IUser;
    postData: IPostPageData;
    onEditClick: () => void;
}
