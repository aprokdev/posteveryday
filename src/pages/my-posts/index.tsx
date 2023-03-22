import Head from 'next/head';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import React from 'react';
import Card from '@components/card';
import Container from '@components/container';
import EmptyPosts from '@components/empty-posts';
import Layout from '@components/layout';

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
                take: 12,
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
                            created: new Date(data.created.toISOString())
                                .toLocaleDateString('en-EN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })
                                .replace(/\//g, '.'),
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
    return error ? (
        <div>{error}</div>
    ) : (
        <Layout user={user}>
            <Head>
                <title>POSTEVERYDAY - MY POSTS</title>
            </Head>
            <div className="bg-gray-200">
                {posts.length === 0 ? (
                    <EmptyPosts user={user} />
                ) : (
                    <Container className="min-h-mainMin">
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4">
                            {Array.isArray(posts) &&
                                posts.map((data) => <Card {...data} key={data.id} />)}
                        </div>
                    </Container>
                )}
            </div>
        </Layout>
    );
}
