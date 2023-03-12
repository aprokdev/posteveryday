import Image from 'next/image';
import Router from 'next/router';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import React, { useReducer, useState } from 'react';
import Button from '@components/button';
import Layout from '@components/layout';
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
    const [preview, setPreview] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
        setPreview(data);
        dispatch(actions.PREVIEW_MODE);
    };

    const updatePost = async () => {
        const formData = new FormData();
        formData.append('image', preview?.image);
        formData.append('title', preview?.title);
        formData.append('html', preview?.html);
        formData.append('id', data?.id);

        try {
            const res = await fetch(`/api/posts/update/`, {
                method: 'POST',
                body: formData,
            });
            const result = await res.json();
            console.log('updatePost result: ', result);
            if (result.success) {
                // dispatch(actions.READ_MODE);
                location.reload();
                document.documentElement.scrollTo(0, 0);
            }
        } catch (error) {
            console.error(`publishPost error: ${error.message}`);
            return error;
        }
    };

    return data && !error ? (
        <Layout user={user}>
            {mode.read && (
                <>
                    <Post {...data} className={`${user ? 'pb-10' : 'pb-20'}`} />
                    {user && (
                        <div className="flex items-center justify-end pb-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                            <Button onClick={() => dispatch(actions.EDIT_MODE)} className="w-20">
                                Edit
                            </Button>
                        </div>
                    )}
                </>
            )}

            {mode.edit && (
                <SmallerContainer className="bg-gray-200 pt-8">
                    <PostForm {...data} onSubmit={onSubmit}>
                        <Button
                            type="button"
                            className="mr-4 border-black text-black border-2 !bg-gray-200 w-20"
                            onClick={() => dispatch(actions.READ_MODE)}
                        >
                            Back
                        </Button>
                        <Button type="submit" className="w-20">
                            Preview
                        </Button>
                    </PostForm>
                </SmallerContainer>
            )}

            {mode.preview && (
                <>
                    <Post
                        {...preview}
                        created={new Date()}
                        author_firstname={user.first_name}
                        author_lastname={user.last_name}
                        imageFile={preview?.image}
                    />
                    <div className="flex items-center justify-end py-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                        <Button
                            type="button"
                            className="mr-4 bg-white border-black text-black border-2 w-20"
                            onClick={() => dispatch(actions.EDIT_MODE)}
                        >
                            Back
                        </Button>
                        <Button type="submit" className="w-20" onClick={updatePost}>
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
