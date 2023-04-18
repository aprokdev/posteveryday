import { IPostData, IPostPageData } from '@frontend/api/types';
import { IUser } from '@utils/user-entity';

export interface IPreviewModeProps {
    user: IUser;
    postData: IPostPageData;
    updatePageData: (newData: IPostData) => void;
    backToEdit: () => void;
}
