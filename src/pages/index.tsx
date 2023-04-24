import dynamic from 'next/dynamic';
import Head from 'next/head';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import { getPosts } from '@frontend/api';
import { IAPIResponse, IGetPostsParams } from '@frontend/api/types';
import { useUser } from '@frontend/hooks/useUser';
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

export async function getStaticProps() {
    try {
        const posts = await prisma.post.findMany({
            take: cardsAmountToLoad,
            orderBy: { created: 'desc' },
            select: feedModel,
        });

        return {
            props: {
                posts: posts.map((data) => {
                    return {
                        ...data,
                        created: formatDateString(data.created.toISOString()),
                    };
                }),
            },
            revalidate: 10, // In seconds
        };
    } catch (error) {
        return {
            props: { error: error.message },
        };
    }
}

export default function Feed({ posts = [], error = '' }: IFeedPageProps): JSX.Element {
    const { user, isLoading } = useUser();

    const cardsLoader = async ({ limit, offset }: IGetPostsParams): Promise<IAPIResponse> => {
        return await getPosts({ limit, offset });
    };

    return (
        <Layout user={user} isUserFetching={isLoading}>
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
                        initialLoad
                    />
                )}
            </div>
            <ToastContainer autoClose={6000} closeButton={ToastClose} />
        </Layout>
    );
}
