import { IPostPageData } from '@frontend/api/types';
import { IFormFields } from '@components/post-form/types';

export interface IEditModeProps {
    postData: IPostPageData;
    backToReadMode: () => void;
    onSubmit: (data: IFormFields) => void;
}
