import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getLoginSession } from '@backend/auth';
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
    return {
        props: {},
    };
}

export default function MyPosts({ posts = [], error = '' }: IFeedPageProps): JSX.Element {
    const { user, isLoading } = useUser();

    const [isPosts, setIsPosts] = React.useState(true);

    const cardsLoader = async ({ limit, offset }: IGetPostsParams): Promise<IAPIResponse> => {
        return await getPosts({ limit, offset, author_id: user.id });
    };

    return (
        user &&
        !isLoading && (
            <Layout user={user} isUserFetching={isLoading}>
                <Head>
                    <title>MY POSTS</title>
                </Head>
                <div className="bg-gray-200 min-h-post">
                    {error && <PageError message={error} />}
                    {!error && !isPosts && <EmptyPosts user={user} />}
                    {!error && isPosts && (
                        <LoadPostsByRequest
                            cardsLoader={cardsLoader}
                            initialPosts={posts}
                            amount={cardsAmountToLoad}
                            zeroPosts={() => setIsPosts(false)}
                        />
                    )}
                </div>
                <ToastContainer autoClose={6000} closeButton={ToastClose} />
            </Layout>
        )
    );
}
