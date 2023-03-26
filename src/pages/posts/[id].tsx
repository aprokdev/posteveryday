import Head from 'next/head';
import Router from 'next/router';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { deletePost, updatePost } from '@frontend/api';
import formatDateString from '@utils/formateDateString';
import React, { useEffect, useReducer, useState } from 'react';
import Button from '@components/button';
import Layout from '@components/layout';
import Loading from '@components/loading';
import Modal from '@components/modal';
import Post from '@components/post';
import PostForm from '@components/post-form';
import SmallerContainer from '@components/smaller-container';

export async function getServerSideProps(context) {
    try {
        const session = await getLoginSession(context.req);
        let user = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
        }
        const data = await prisma.post.findUnique({
            where: {
                id: Number(context.params.id),
            },
        });

        return {
            props: {
                user,
                data: { ...data, created: formatDateString(data.created.toISOString()) },
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

export const actions = {
    EDIT_MODE: 'EDIT_MODE',
    READ_MODE: 'READ_MODE',
    PREVIEW_MODE: 'PREVIEW_MODE',
};

export const initialState = {
    read: true,
    preview: false,
    edit: false,
};

export function reducer(state, action) {
    if (action === 'EDIT_MODE') {
        return { read: false, preview: false, edit: true };
    }
    if (action === 'READ_MODE') {
        return {
            read: true,
            preview: false,
            edit: false,
        };
    }
    if (action === 'PREVIEW_MODE') {
        return {
            read: false,
            preview: true,
            edit: false,
        };
    }
    return state;
}

export default function PostPage({ user, data, error = '' }) {
    const [mode, dispatch] = useReducer(reducer, initialState);
    useEffect(() => document.documentElement.scrollTo(0, 0), [mode]);

    const [preview, setPreview] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [isModal, setIsModal] = useState(false);

    // to have ability make step back and dont loose changes
    const [updatedData, setUpdatedData] = useState(data);

    const onDelete = async () => {
        setIsLoading(true);
        try {
            const result = await deletePost({ id: data?.id, image: data?.image });
            if (result.success) {
                Router.push('/my-posts');
            }
            setIsModal(false);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const onSubmit = (data) => {
        setUpdatedData(data);
        setPreview(data);
        dispatch(actions.PREVIEW_MODE);
    };

    const onPreviewBackClick = React.useCallback(() => {
        setUpdatedData(data);
        dispatch(actions.READ_MODE);
    }, []);

    const publishUpdatedPost = async () => {
        setIsLoading(true);
        const result = await updatePost({ ...preview, id: data?.id });
        if (result.success) {
            setUpdatedData(result?.data);
            dispatch(actions.READ_MODE);
            document.documentElement.scrollTo(0, 0);
        }
        setIsLoading(false);
    };

    const isActionsVisible = user ? user.id === data.author_id || user.role === 'admin' : false;

    return data && !error ? (
        <Layout user={user}>
            <Head>
                <title>{updatedData.title}</title>
            </Head>
            {isModal && (
                <Modal onClose={() => setIsModal(false)}>
                    <span className="block text-2xl text-center mb-12">Are you sure?</span>
                    <div className="flex items-center justify-center h-14">
                        {isLoading ? (
                            <div className="">
                                <Loading text="Deleting" dotsMargin={1} />
                            </div>
                        ) : (
                            <>
                                <Button
                                    onClick={() => setIsModal(false)}
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
            )}
            {mode.read && (
                <div className="min-h-post">
                    <Post {...updatedData} className={`${isActionsVisible ? '' : 'pb-20'}`} />

                    {isActionsVisible && (
                        <SmallerContainer className="flex items-center justify-end py-10">
                            <Button
                                onClick={() => setIsModal(true)}
                                className="mr-4 bg-white border-black text-black border-2 w-28"
                            >
                                Delete
                            </Button>
                            <Button onClick={() => dispatch(actions.EDIT_MODE)} className="w-28">
                                Edit
                            </Button>
                        </SmallerContainer>
                    )}
                </div>
            )}

            {mode.edit && (
                <div className="bg-gray-200 pt-8 min-h-mainMin">
                    <SmallerContainer>
                        <PostForm {...updatedData} onSubmit={onSubmit}>
                            <Button
                                type="button"
                                className="mr-4 border-black text-black border-2 !bg-gray-200 w-28"
                                onClick={onPreviewBackClick}
                            >
                                Back
                            </Button>
                            <Button type="submit" className="w-28">
                                Preview
                            </Button>
                        </PostForm>
                    </SmallerContainer>
                </div>
            )}

            {mode.preview && (
                <>
                    <Post
                        {...preview}
                        created={formatDateString(data.created)}
                        author_firstname={user.first_name}
                        author_lastname={user.last_name}
                        imageFile={preview?.image}
                        image={data.image}
                    />
                    <div className="flex items-center justify-end py-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                        <Button
                            type="button"
                            disabled={isLoading}
                            className="mr-4 bg-white border-black text-black border-2 w-28"
                            onClick={() => dispatch(actions.EDIT_MODE)}
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
                </>
            )}
        </Layout>
    ) : (
        <div>{error}</div>
    );
}
