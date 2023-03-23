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

export default function PostsLoader({ cardsLoader, initialPosts, amount }) {
    const [state, setState] = React.useState({
        list: initialPosts,
        offset: amount,
        limit: amount,
        hasMore: true,
        errorMessage: '',
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const loadPosts = React.useCallback(async () => {
        if (isLoading) return;
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
        </>
    );
}
