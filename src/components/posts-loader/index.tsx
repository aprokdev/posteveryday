import { InfoIcon } from '@icons';
import { makeCorrectPostsList } from '@utils/makeCorrectPostsList';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { toast } from 'react-toastify';
import Card from '@components/card';
import Container from '@components/container';
import FeedCardsContainer from '@components/feed-cards-container';
import FeedError from '@components/feed-error';
import FeedLoading from '@components/feed-loading';
import { IPostsLoaderProps } from './types';

export default function PostsLoader({
    cardsLoader,
    initialPosts,
    amount,
}: IPostsLoaderProps): JSX.Element {
    const [state, setState] = React.useState({
        list: initialPosts,
        offset: amount,
        limit: amount,
        hasMore: true,
        errorMessage: '',
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const loadPosts = React.useCallback(async () => {
        if (isLoading || errorMessage || initialPosts.length < amount) return;
        console.log(isLoading, errorMessage);

        setIsLoading(true);
        try {
            const { limit, offset, list } = state;
            const result = await cardsLoader({ limit, offset });
            let hasMore = true;
            // for resolving possible issues, read makeCorrectPostsList description:
            const { correctListPosts, additionalOffset } = makeCorrectPostsList(
                list,
                result?.data?.list
            );

            additionalOffset && console.log(additionalOffset);

            if (additionalOffset) {
                toast.info(
                    <span>
                        There are fresh posts! <br />
                        You can update the page and see them!
                    </span>,
                    { icon: <InfoIcon /> }
                );
            }

            if (result?.data?.list?.length < amount) {
                hasMore = false;
            }

            setState({
                list: correctListPosts,
                offset: state.offset + amount + additionalOffset,
                limit: amount,
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

    const { list, hasMore, errorMessage } = state;

    return (
        <>
            {list.length > 0 && (
                <Container className="min-h-mainMin">
                    <InfiniteScroll
                        loadMore={loadPosts}
                        hasMore={hasMore}
                        loader={
                            !errorMessage &&
                            initialPosts.length >= amount && <FeedLoading key="feed-loading" />
                        }
                        initialLoad={false}
                        threshold={700}
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
        </>
    );
}
