import Head from 'next/head';
import Router from 'next/router';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { deletePost, updatePost } from '@frontend/api';
import React, { useEffect, useReducer, useState } from 'react';
import Button from '@components/button';
import Layout from '@components/layout';
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

        data.created = JSON.parse(JSON.stringify(data.created.toISOString()));
        return {
            props: { user, data },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

const actions = {
    EDIT_MODE: 'EDIT_MODE',
    READ_MODE: 'READ_MODE',
    PREVIEW_MODE: 'PREVIEW_MODE',
};

const initialState = {
    read: true,
    preview: false,
    edit: false,
};

const reducer = (state, action) => {
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
};

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
            const result = await deletePost(data?.id);
            if (result.success) {
                Router.push('/my-posts');
            }
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
        const result = await updatePost({ ...preview, id: data?.id });
        if (result.success) {
            setUpdatedData(result?.data);
            dispatch(actions.READ_MODE);
            document.documentElement.scrollTo(0, 0);
        }
    };

    return data && !error ? (
        <Layout user={user}>
            <Head>
                <title>{updatedData.title}</title>
            </Head>
            {isModal && (
                <Modal onClose={() => setIsModal(false)}>
                    <span className="block text-2xl text-center mb-12">Are you sure?</span>
                    <div className="flex items-center justify-center">
                        <Button
                            onClick={() => setIsModal(false)}
                            disabled={isLoading}
                            className="mr-4 bg-white border-black text-black border-2 w-20"
                        >
                            No
                        </Button>
                        <Button onClick={onDelete} disabled={isLoading} className="w-20">
                            Yes
                        </Button>
                    </div>
                </Modal>
            )}
            {mode.read && (
                <>
                    <Post {...updatedData} className={`${user ? 'pb-10' : 'pb-20'}`} />

                    {user && (
                        <div className="flex items-center justify-end pb-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                            {user.role === 'admin' && (
                                <Button
                                    onClick={() => setIsModal(true)}
                                    className="mr-4 bg-white border-black text-black border-2 w-20"
                                >
                                    Delete
                                </Button>
                            )}
                            {user.role === 'admin' || user.id === data.author_id ? (
                                <Button
                                    onClick={() => dispatch(actions.EDIT_MODE)}
                                    className="w-20"
                                >
                                    Edit
                                </Button>
                            ) : null}
                        </div>
                    )}
                </>
            )}

            {mode.edit && (
                <div className="bg-gray-200 pt-8 min-h-mch">
                    <SmallerContainer>
                        <PostForm {...updatedData} onSubmit={onSubmit}>
                            <Button
                                type="button"
                                className="mr-4 border-black text-black border-2 !bg-gray-200 w-20"
                                onClick={onPreviewBackClick}
                            >
                                Back
                            </Button>
                            <Button type="submit" className="w-20">
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
                        created={new Date()}
                        author_firstname={user.first_name}
                        author_lastname={user.last_name}
                        imageFile={preview?.image}
                        image={data.image && !preview?.image && data.image}
                    />
                    <div className="flex items-center justify-end py-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                        <Button
                            type="button"
                            className="mr-4 bg-white border-black text-black border-2 w-20"
                            onClick={() => dispatch(actions.EDIT_MODE)}
                        >
                            Back
                        </Button>
                        <Button type="submit" className="w-20" onClick={publishUpdatedPost}>
                            Update
                        </Button>
                    </div>
                </>
            )}
        </Layout>
    ) : (
        <div>{error}</div>
    );
}
