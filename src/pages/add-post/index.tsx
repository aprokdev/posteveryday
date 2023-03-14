import Router from 'next/router';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from '@components/button';
import Layout from '@components/layout';
import Post from '@components/post';
import PostForm from '@components/post-form';
import { IFormFields } from '@components/post-form/types';
import SmallerContainer from '@components/smaller-container';

export async function getServerSideProps({ req }) {
    try {
        const session = await getLoginSession(req);
        let user = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
            const { hash, salt, ...rest } = user;
            user = rest;
            return { props: { user } };
        } else {
            return {
                redirect: {
                    destination: '/401',
                    permanent: true,
                },
            };
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/401',
                permanent: true,
            },
        };
    }
}

export default function AddPost({ user }) {
    const [preview, setPreview] = useState(null);
    const [previewMode, setPreviewMode] = useState(false);

    const onSubmit = (formFields: IFormFields) => {
        console.log('!!!formFields', formFields);
        setPreview(formFields);
        setPreviewMode(true);
    };

    const publishPost = async () => {
        const formData = new FormData();
        formData.append('image', preview?.image);
        formData.append('title', preview?.title);
        formData.append('html', preview?.html);

        try {
            const res = await fetch('/api/posts/create', {
                method: 'POST',
                body: formData,
            });
            const result = await res.json();
            console.log('publishPost result: ', result);
            if (result.success) {
                Router.push('/my-posts');
            }
        } catch (error) {
            console.error(`publishPost error: ${error.message}`);
            return error;
        }
    };

    return (
        <Layout user={user}>
            {previewMode ? (
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
                            className="mr-4 bg-white border-black text-black border-2"
                            onClick={() => setPreviewMode(false)}
                        >
                            Back
                        </Button>
                        <Button type="submit" onClick={publishPost}>
                            Publish
                        </Button>
                    </div>
                </>
            ) : (
                <div className="bg-gray-200 pt-8">
                    <SmallerContainer className="min-h-mch">
                        <PostForm {...preview} onSubmit={onSubmit} strongImageValidation>
                            <Button type="submit">Preview</Button>
                        </PostForm>
                    </SmallerContainer>
                </div>
            )}
        </Layout>
    );
}
