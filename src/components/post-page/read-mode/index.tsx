import { useState } from 'react';
import Button from '@components/button';
import Post from '@components/post';
import DeleteConfirmModal from '@components/post-page/delete-confirm-modal';
import SmallerContainer from '@components/smaller-container';
import { IReadModeProps } from './types';

export default function ReadMode({ user, postData, onEditClick }: IReadModeProps): JSX.Element {
    const [isModal, setIsModal] = useState<boolean>(false);

    const isActionsVisible = user
        ? String(user.id) === String(postData.author_id) || user.role === 'admin'
        : false;

    return (
        <>
            {isModal && (
                <DeleteConfirmModal
                    onClose={() => setIsModal(false)}
                    postId={String(postData?.id)}
                    imageURL={postData?.image}
                />
            )}
            <div className="min-h-post">
                <Post
                    {...postData}
                    imageURL={postData.image}
                    className={`${isActionsVisible ? '' : 'pb-20'}`}
                />

                {isActionsVisible && (
                    <SmallerContainer className="flex items-center justify-end py-10">
                        <Button
                            onClick={() => setIsModal(true)}
                            className="mr-4 bg-white border-black text-black border-2 w-28"
                        >
                            Delete
                        </Button>
                        <Button onClick={onEditClick} className="w-28">
                            Edit
                        </Button>
                    </SmallerContainer>
                )}
            </div>
        </>
    );
}
