import Image from 'next/image';
import { useRouter } from 'next/router';
import { withSSRContext } from 'aws-amplify';
import React from 'react';
import Layout from 'src/components/layout';
import MainContainer from 'src/components/main-container';
import { Post } from '../../models';

export default function LoginPage({ post }): JSX.Element | string {
    const router = useRouter();

    if (router.isFallback) {
        return 'Loading ... ';
    }

    const { title, img, html } = post;

    return (
        <Layout>
            <div className="min-h bg-grey-200">
                <div className="w-full relative h-72 flex items-center justify-center bg-stone-200">
                    <Image
                        src={img}
                        alt="Picture of the author"
                        className="w-full h-72 object-cover object-center"
                        sizes="(min-width: 640px) 640px, (min-width: 768px) 768px,
                    (min-width: 1024px) 1024px, (max-width: 1200px) 1200px"
                        fill
                    />
                </div>
                <MainContainer>
                    <div className="mt-6">
                        <h1 className="text-6xl text-center mb-10">{title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </MainContainer>
            </div>
        </Layout>
    );
}

export async function getStaticPaths(req) {
    const { DataStore } = withSSRContext(req);
    const posts = await DataStore.query(Post);
    const paths = posts.map((post) => ({
        params: { id: post.id },
    }));

    // { params: { id: post.id} }
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(req) {
    const { DataStore } = withSSRContext(req);
    const { params } = req;
    const { id } = params;
    const post = await DataStore.query(Post, id);

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
        },
        revalidate: 100,
    };
}
