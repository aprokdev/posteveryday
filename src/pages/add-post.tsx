import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { createPost } from '@frontend/api';
import { useUser } from '@frontend/hooks/useUser';
import formatDateString from '@utils/formateDateString';
import { IAddPostProps } from '@utils/pages-types';
import React, { useState } from 'react';
import Button from '@components/button';
import Layout from '@components/layout';
import Loading from '@components/loading';
import Post from '@components/post';
import PostForm from '@components/post-form';
import { IFormFields } from '@components/post-form/types';
import SmallerContainer from '@components/smaller-container';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
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

// export async function getStaticProps() {
//     return {
//         props: {},
//     };
// }

export default function AddPost({ user }: IAddPostProps): JSX.Element {
    // const { user, isLoading } = useUser();
    // const router = useRouter();

    // if (!user && !isLoading) {
    //     router.push('/401');
    // }
    const [preview, setPreview] = useState<IFormFields | null>(null);
    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const [isLoding, setIsLoading] = useState<boolean>(false);

    const goToPreview = (formFields: IFormFields): void => {
        setPreview(formFields);
        setPreviewMode(true);
    };

    const publishPost = async (): Promise<void> => {
        setIsLoading(true);
        const result = await createPost(preview);
        if (result.success) {
            Router.push('/my-posts');
        }
        setIsLoading(false);
    };

    return (
        <Layout user={user} isUserFetching={false}>
            <Head>
                <title>POSTEVERYDAY - ADD POST</title>
            </Head>
            {previewMode ? (
                <div className="min-h-post">
                    <Post
                        {...preview}
                        created={formatDateString(new Date().toISOString())}
                        author_firstname={user.first_name}
                        author_lastname={user.last_name}
                        imageFile={preview?.image}
                    />
                    <div className="flex items-center justify-end py-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                        <Button
                            type="button"
                            disabled={isLoding}
                            className="w-32 mr-4 bg-white border-black text-black border-2"
                            onClick={() => setPreviewMode(false)}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoding}
                            className="w-32"
                            onClick={publishPost}
                        >
                            {isLoding ? <Loading text="Publishing" /> : 'Publish'}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-200 pt-8">
                    <SmallerContainer className="min-h-mainMin">
                        <PostForm {...preview} onSubmit={goToPreview} imageValidation>
                            <Button type="submit" className="w-32">
                                Preview
                            </Button>
                        </PostForm>
                    </SmallerContainer>
                </div>
            )}
        </Layout>
    );
}
