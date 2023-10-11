import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

// export async function getStaticProps() {
//     return {
//         props: {},
//         revalidate: 10, // In seconds
//     };
// }

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    try {
        const session = await getLoginSession(req);
        let user = null;
        let posts = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
            const { hash, salt, ...rest } = user;
            user = rest;

            posts = await prisma.post.findMany({
                take: cardsAmountToLoad,
                where: { author_id: Number(session?.id) },
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
        } else {
            return {
                redirect: {
                    destination: '/401',
                    permanent: true,
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

export default function MyPosts({ posts = [], error = '' }: IFeedPageProps): JSX.Element {
    const { user, isLoading } = useUser();
    // const router = useRouter();

    // console.log('user, isLoading', user, isLoading);

    // if (isLoading === false && user === null) {
    //     router.push('/401');
    // }

    const [isPosts, setIsPosts] = React.useState(true);

    const cardsLoader = async ({ limit, offset }: IGetPostsParams): Promise<IAPIResponse> => {
        return await getPosts({ limit, offset, author_id: user.id });
    };

    return (
        <Layout user={user} isUserFetching={false}>
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
                        initialLoad
                    />
                )}
            </div>
            <ToastContainer autoClose={6000} closeButton={ToastClose} />
        </Layout>
    );
}
