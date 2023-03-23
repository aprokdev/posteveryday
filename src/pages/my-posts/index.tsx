import Head from 'next/head';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import { getPosts } from '@frontend/api';
import formatDateString from '@utils/formateDateString';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import EmptyPosts from '@components/empty-posts';
import Layout from '@components/layout';
import PageError from '@components/page-error';
import PostsLoader from '@components/posts-loader';
import ToastClose from '@components/toast-close';
import UpButton from '@components/up-button';

const cardsAmountToLoad = 8;

export async function getServerSideProps({ req, res }) {
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

export default function MyPosts({ user, posts = [], error = '' }): JSX.Element {
    const cardsLoader = async ({ limit, offset }) => {
        return await getPosts({ limit, offset, author_id: user.id });
    };

    return (
        <Layout user={user}>
            <Head>
                <title>MY POSTS</title>
            </Head>
            <div className="bg-gray-200">
                {error && <PageError message={error} />}
                {posts.length === 0 && <EmptyPosts user={user} />}
                {posts.length > 0 && (
                    <PostsLoader
                        cardsLoader={cardsLoader}
                        initialPosts={posts}
                        amount={cardsAmountToLoad}
                    />
                )}
                {/* <UpButton /> */}
            </div>
            <ToastContainer autoClose={6000} closeButton={ToastClose} />
        </Layout>
    );
}
