import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPosts } from '@frontend/api';
import { IAPIResponse, IGetPostsParams } from '@frontend/api/types';
import { useUser } from '@frontend/hooks/useUser';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Container from '@components/container';
import FeedSkeletonLoader from '@components/feed-skeleton-loader';
import Layout from '@components/layout';
import LoadPostsByRequest from '@components/load-posts-by-request';
import ToastClose from '@components/toast-close';

const EmptyPosts = dynamic(() => import('@components/empty-posts'));

const className =
    'grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 xl:gap-4';

const cardsAmountToLoad = 16;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 10, // In seconds
    };
}

export default function MyPosts(): JSX.Element {
    const { user, isLoading } = useUser();
    const router = useRouter();

    if (isLoading === false && user === null) {
        router.push('/401');
    }

    const [isPosts, setIsPosts] = React.useState(true);

    const cardsLoader = async ({ limit, offset }: IGetPostsParams): Promise<IAPIResponse> => {
        return await getPosts({ limit, offset, author_id: user?.id });
    };

    return (
        <Layout user={user} isUserFetching={isLoading}>
            <Head>
                <title>MY POSTS ISR</title>
            </Head>
            <div className="bg-gray-200 min-h-post">
                {!isPosts && <EmptyPosts user={user} />}

                {!user && isLoading && (
                    <Container className="min-h-mainMin">
                        <div className={className}>
                            {isLoading && <FeedSkeletonLoader amount={cardsAmountToLoad} />}
                        </div>
                    </Container>
                )}

                {isPosts && user && (
                    <LoadPostsByRequest
                        cardsLoader={cardsLoader}
                        amount={cardsAmountToLoad}
                        zeroPosts={() => setIsPosts(false)}
                        initialLoad
                    />
                )}
            </div>
            <ToastContainer autoClose={6000} closeButton={ToastClose} />
        </Layout>
    );
}
