import dynamic from 'next/dynamic';
import Router from 'next/router';
import { deletePost } from '@frontend/api';
import { useState } from 'react';
import Button from '@components/button';
import Loading from '@components/loading';
import { IModalProps } from './types';

const Modal = dynamic(() => import('@components/modal'));

export default function DeleteConfirmModal(props: IModalProps): JSX.Element {
    const { onClose, postId, imageURL } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDelete = async () => {
        setIsLoading(true);
        try {
            const result = await deletePost({ id: postId, image: imageURL });
            if (result.success) {
                Router.push('/my-posts');
            }
            onClose();
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <Modal onClose={onClose}>
            <span className="block text-2xl text-center mb-12">Are you sure?</span>
            <div className="flex items-center justify-center h-14">
                {isLoading ? (
                    <div className="">
                        <Loading text="Deleting" dotsMargin={1} />
                    </div>
                ) : (
                    <>
                        <Button
                            onClick={onClose}
                            disabled={isLoading}
                            className="mr-4 bg-white border-black text-black border-2 w-28"
                        >
                            No
                        </Button>
                        <Button onClick={onDelete} disabled={isLoading} className="w-28">
                            Yes
                        </Button>
                    </>
                )}
            </div>
        </Modal>
    );
}
