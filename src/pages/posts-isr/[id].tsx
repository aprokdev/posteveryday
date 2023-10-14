import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import formatDateString from '@utils/formateDateString';
import { IPostPageProps, IReducerState } from '@utils/pages-types';
import React, { useEffect, useReducer, useState } from 'react';
import Layout from '@components/layout';
import { useUser } from '@frontend/hooks/useUser';
import ReadMode from '@components/post-page/read-mode';
import {getPosts} from '@frontend/api';

const EditMode = dynamic(() => import('@components/post-page/edit-mode'));
const PreviewMode = dynamic(() => import('@components/post-page/preview-mode'));

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

export function reducer(state: IReducerState, action: string): IReducerState {
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

export default function PostPage({ user, data, error = '' }: IPostPageProps): JSX.Element {
    const { user, isLoading } = useUser();

    const data = 

    const [mode, dispatch] = useReducer(reducer, initialState);

    useEffect(() => document.documentElement.scrollTo(0, 0), [mode]);

    // to have ability make step back and dont loose changes
    const [postData, setPostData] = useState(data);

    const [preview, setPreview] = useState(null);

    // EDIT MODE
    const backToReadMode = React.useCallback(() => {
        setPostData(data);
        dispatch(actions.READ_MODE);
    }, []);

    const onSubmit = (updatedData) => {
        setPostData({
            ...updatedData,
            imageURL: data.image,
        });

        setPreview({
            ...updatedData,
            id: data.id,
            created: data?.created,
            imageURL: data?.image,
            imageFile: updatedData.image,
        });
        dispatch(actions.PREVIEW_MODE);
    }; //

    const updatePageData = (newData) => {
        setPostData(newData);
        dispatch(actions.READ_MODE);
        document.documentElement.scrollTo(0, 0);
    };

    return data && !error ? (
        <Layout user={user} isUserFetching={false}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div className="min-h-post">
                {mode.read && (
                    <ReadMode
                        user={user}
                        postData={postData}
                        onEditClick={() => dispatch(actions.EDIT_MODE)}
                    />
                )}

                {mode.edit && (
                    <EditMode
                        postData={postData}
                        backToReadMode={backToReadMode}
                        onSubmit={onSubmit}
                    />
                )}

                {mode.preview && (
                    <PreviewMode
                        user={user}
                        postData={preview}
                        backToEdit={() => dispatch(actions.EDIT_MODE)}
                        updatePageData={updatePageData}
                    />
                )}
            </div>
        </Layout>
    ) : (
        <div>{error}</div>
    );
}
