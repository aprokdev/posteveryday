import Head from 'next/head';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import React from 'react';
import Card from '@components/card';
import Container from '@components/container';
import EmptyPosts from '@components/empty-posts';
import Layout from '@components/layout';

export async function getServerSideProps({ req }) {
    try {
        const session = await getLoginSession(req);
        let user = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
            const { hash, salt, ...rest } = user;
            user = rest;
        }

        const posts = await prisma.post.findMany({
            take: 40,
            orderBy: { created: 'desc' },
            select: feedModel,
        });

        return {
            props: {
                user,
                posts: posts.map((data) => ({
                    ...data,
                    created: JSON.parse(JSON.stringify(data.created.toISOString())),
                })),
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

export default function Feed({ user, posts = [], error = '' }): JSX.Element {
    return error ? (
        <div>{error}</div>
    ) : (
        <Layout user={user}>
            <Head>
                <title>POSTEVERYDAY</title>
            </Head>
            <div className="bg-gray-200">
                {posts.length === 0 ? (
                    <EmptyPosts user={user} />
                ) : (
                    <Container className="min-h-mainMin">
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4">
                            {Array.isArray(posts) &&
                                posts.map((data) => <Card {...data} key={data.id} />)}
                        </div>
                    </Container>
                )}
            </div>
        </Layout>
    );
}
