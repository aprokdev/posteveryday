import { InfoIcon } from '@icons';
import { makeCorrectPostsList } from '@utils/makeCorrectPostsList';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { toast } from 'react-toastify';
import Card from '@components/card';
import CardSkeleton from '@components/card-skeleton';
import Container from '@components/container';
import FeedError from '@components/feed-error';
import UpButton from '@components/up-button';
import { IPostsLoaderProps } from './types';

function SkeletonLoader({ amount }: { amount: number }) {
    return (
        <React.Fragment>
            {Array(amount)
                .fill('')
                .map((item, i) => i)
                .map((item) => (
                    <CardSkeleton key={item} />
                ))}
        </React.Fragment>
    );
}

const className =
    'grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4';

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

    const isMobile = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 640;
        }
        return false;
    }, []);

    const [isLoading, setIsLoading] = React.useState(false);

    const loadPosts = React.useCallback(async () => {
        if (isLoading || errorMessage || initialPosts.length < amount) return;

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

    React.useEffect(() => document.documentElement.scrollTo(0, 0), []);

    const { list, hasMore, errorMessage } = state;

    return (
        list.length > 0 && (
            <Container className="min-h-mainMin">
                <InfiniteScroll
                    loadMore={loadPosts}
                    hasMore={hasMore}
                    loader={
                        !errorMessage &&
                        initialPosts.length >= amount && (
                            <SkeletonLoader amount={amount} key="123" />
                        )
                    }
                    initialLoad={false}
                    threshold={isMobile ? 4500 : 1200}
                    className={className}
                >
                    {/* <div id="wrap">
                        <SkeletonLoader amount={amount} />
                    </div> */}

                    {list.map((data, i) => (
                        <Card {...data} key={data.id} index={i} />
                    ))}
                    {errorMessage && <FeedError message={errorMessage} />}
                </InfiniteScroll>
                {isMobile && <UpButton />}
            </Container>
        )
    );
}
