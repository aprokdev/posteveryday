import Link from 'next/link';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import React from 'react';
import Card from '@components/card';
import Container from '@components/container';
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
                    posts: posts.map((data) => ({
                        ...data,
                        // prisma returns Date onjects, so we need additionally stringify it
                        created: JSON.parse(JSON.stringify(data.created.toISOString())),
                    })),
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
            <Container className="bg-gray-200">
                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96 w-full mt-20">
                        <h1 className="block mb-5 text-center w-full text-4xl">
                            There are no posts yet
                        </h1>
                        <p>
                            You can {!user && <Link href="/login">log in</Link>} {!user && 'and'}{' '}
                            create one ;D
                        </p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4">
                        {Array.isArray(posts) &&
                            posts.map((data) => <Card {...data} key={data.id} />)}
                    </div>
                )}
            </Container>
        </Layout>
    );
}

{
    /* <Card img={airport} />
                    <Card img={clearSky} />
                    <Card img={rainy} />
                    <Card img={cat} />
                    <Card img={city} />
                    <Card img={cancer} />
                    <Card img={room} />
                    <Card img={night} />
                    <Card img={woman} />
                    <Card img={kitchen} />
                    <Card img={skyscrapper} />
                    <Card img={figures} />
                    <Card img={canada} />
                    <Card img={train} />
                    <Card img={money} />
                    <Card img={chemistry} />
                    <Card img={medicine} />
                    <Card img={sign} />
                    <Card img={sunset} />
                    <Card img={t} />
                    <Card img={rel} />
                    <Card img={phone} />
                    <Card img={hromosome} />
                    <Card img={london} />
                    <Card img={ocean} />
                    <Card img={shoe} /> */
}
