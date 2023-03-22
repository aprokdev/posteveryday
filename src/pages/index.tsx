import Head from 'next/head';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { feedModel } from '@backend/utils/data';
import { getPosts } from '@frontend/api';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '@components/card';
import Container from '@components/container';
import EmptyPosts from '@components/empty-posts';
import FeedCardsContainer from '@components/feed-cards-container';
import FeedError from '@components/feed-error';
import FeedLoading from '@components/feed-loading';
import Layout from '@components/layout';
import PageError from '@components/page-error';
import UpButton from '@components/up-button';

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
            take: 8,
            orderBy: { created: 'desc' },
            select: feedModel,
        });

        return {
            props: {
                user,
                posts: posts.map((data) => {
                    const dateString = new Date(data.created.toISOString())
                        .toLocaleDateString('en-EN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })
                        .replace(/\//g, '.');
                    return {
                        ...data,
                        created: dateString,
                    };
                }),
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

const cardsAmountToLoad = 8;

export default function Feed({ user, posts = [], error = '' }): JSX.Element {
    const [state, setState] = React.useState({
        list: posts,
        offset: cardsAmountToLoad,
        limit: cardsAmountToLoad,
        hasMore: true,
        errorMessage: '',
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const loadPosts = React.useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const { limit, offset } = state;
            const result = await getPosts({ limit, offset });
            let hasMore = true;
            if (result?.data?.list?.length < cardsAmountToLoad) {
                hasMore = false;
            }
            setState({
                list: state.list.concat(result?.data?.list),
                offset: state.offset + cardsAmountToLoad,
                limit: cardsAmountToLoad,
                hasMore,
                errorMessage: '',
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setState({
                ...state,
                errorMessage: error.message,
            });
        }
    }, [isLoading, state]);

    React.useEffect(() => document.documentElement.scrollTo(0, 0), []);

    const { list, hasMore, errorMessage } = state;

    return (
        <Layout user={user}>
            <Head>
                <title>POSTEVERYDAY</title>
            </Head>
            <div className="bg-gray-200">
                {error && <PageError message={error} />}
                {list.length === 0 && <EmptyPosts user={user} />}
                {list.length === 0 && <EmptyPosts user={user} />}
                {list.length > 0 && (
                    <Container className="min-h-mainMin">
                        <InfiniteScroll
                            loadMore={loadPosts}
                            hasMore={hasMore}
                            loader={<FeedLoading key="feed-loading" />}
                            initialLoad={false}
                            threshold={500}
                        >
                            <FeedCardsContainer>
                                {list.map((data, i) => (
                                    <Card {...data} key={data.id} index={i} />
                                ))}
                            </FeedCardsContainer>
                        </InfiniteScroll>

                        {errorMessage && <FeedError message={errorMessage} />}
                    </Container>
                )}
                <UpButton />
            </div>
        </Layout>
    );
}
