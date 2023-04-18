import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import { getPosts } from '@frontend/api';
import { IAPIResponse, IGetPostsParams } from '@frontend/api/types';
import formatDateString from '@utils/formateDateString';
import { IFeedPageProps } from '@utils/pages-types';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from '@components/layout';
import LoadPostsByRequest from '@components/load-posts-by-request';
import ToastClose from '@components/toast-close';

const PageError = dynamic(() => import('@components/page-error'));
const EmptyPosts = dynamic(() => import('@components/empty-posts'));

const cardsAmountToLoad = 16;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    try {
        const session = await getLoginSession(req);
        let user = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
            const { hash, salt, ...rest } = user;
            user = rest;
        }

        const posts = await prisma.post.findMany({
            take: cardsAmountToLoad,
            orderBy: { created: 'desc' },
            select: feedModel,
        });

        return {
            props: {
                user,
                posts: posts.map((data) => {
                    return {
                        ...data,
                        created: formatDateString(data.created.toISOString()),
                    };
                }),
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

export default function Feed({ user, posts = [], error = '' }: IFeedPageProps): JSX.Element {
    const cardsLoader = async ({ limit, offset }: IGetPostsParams): Promise<IAPIResponse> => {
        return await getPosts({ limit, offset });
    };

    return (
        <Layout user={user}>
            <Head>
                <title>POSTEVERYDAY</title>
            </Head>
            <div className="bg-gray-200">
                {error && <PageError message={error} />}
                {!error && posts.length === 0 && <EmptyPosts user={user} />}
                {!error && posts.length > 0 && (
                    <LoadPostsByRequest
                        cardsLoader={cardsLoader}
                        initialPosts={posts}
                        amount={cardsAmountToLoad}
                    />
                )}
            </div>
            <ToastContainer autoClose={6000} closeButton={ToastClose} />
        </Layout>
    );
}
