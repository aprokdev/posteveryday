import Image from 'next/image';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import React from 'react';
import Layout from '@components/layout';
import Post from '@components/post';

export async function getServerSideProps(context) {
    try {
        const session = await getLoginSession(context.req);
        let user = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
        }
        const data = await prisma.post.findUnique({
            where: {
                id: Number(context.params.id),
            },
        });
        data.created = JSON.parse(JSON.stringify(data.created.toISOString()));
        return {
            props: { user, data },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

export default function PostPage({ user, data, error = '' }) {
    const date = React.useMemo(() => {
        const date = new Date(data.created);
        return date
            .toLocaleDateString('en-EN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .replace(/\//g, '.');
    }, [data]);

    return data && !error ? (
        <Layout user={user}>
            <Post {...data} />
        </Layout>
    ) : (
        <div>{error}</div>
    );
}
