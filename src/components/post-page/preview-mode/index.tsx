import { updatePost } from '@frontend/api';
import formatDateString from '@utils/formateDateString';
import { useState } from 'react';
import Button from '@components/button';
import Loading from '@components/loading';
import Post from '@components/post';
import { IPreviewModeProps } from './types';

export default function PreviewMode(props: IPreviewModeProps): JSX.Element {
    const { user, postData, updatePageData, backToEdit } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const publishUpdatedPost = async () => {
        setIsLoading(true);
        const result = await updatePost({ ...postData, id: String(postData?.id) });
        if (result.success) {
            updatePageData(result?.data);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-post">
            <Post
                {...postData}
                created={formatDateString(postData.created)}
                author_firstname={user.first_name}
                author_lastname={user.last_name}
            />
            <div className="flex items-center justify-end py-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                <Button
                    type="button"
                    disabled={isLoading}
                    className="mr-4 !bg-white !border-black !text-black !border-2 w-28"
                    onClick={backToEdit}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-28"
                    onClick={publishUpdatedPost}
                >
                    {isLoading ? <Loading text="Updating" /> : 'Update'}
                </Button>
            </div>
        </div>
    );
}
