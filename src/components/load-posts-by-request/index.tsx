import { InfoIcon } from '@icons';
import { makeCorrectPostsList } from '@utils/makeCorrectPostsList';
import React from 'react';
import { toast } from 'react-toastify';
import Button from '@components/button';
import Card from '@components/card';
import Container from '@components/container';
import FeedError from '@components/feed-error';
import FeedSkeletonLoader from '@components/feed-skeleton-loader';
import UpButton from '@components/up-button';
import { IPostsLoaderProps, IState } from './types';

const className =
    'grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4';

export default function LoadPostsByRequest(props: IPostsLoaderProps): JSX.Element {
    const { cardsLoader, initialPosts = [], amount, zeroPosts } = props;

    const [state, setState] = React.useState<IState>({
        list: initialPosts,
        offset: initialPosts.length === amount ? amount : 0,
        limit: amount,
        hasMore: true,
        errorMessage: '',
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    const [isLoading, setIsLoading] = React.useState(true);

    const loadPosts = React.useCallback(async (): Promise<void> => {
        if (isLoading || errorMessage) return;

        setIsLoading(true);
        try {
            const { limit, offset, list } = state;
            const result = await cardsLoader({ limit, offset });
            let hasMore = true;

            if (
                result?.data?.list?.length === 0 &&
                initialPosts.length === 0 &&
                typeof zeroPosts === 'function'
            ) {
                zeroPosts();
            }
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
            setState({
                ...state,
                errorMessage: error.message,
            });
            setIsLoading(false);
        }
    }, [isLoading, state]);

    React.useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        loadPosts();
    }, []);

    const { list, hasMore, errorMessage } = state;

    return (
        list.length > 0 && (
            <Container className="min-h-mainMin">
                <div className={className}>
                    {list.map((data, i) => (
                        <Card {...data} key={data.id} index={i} />
                    ))}
                    {isLoading && <FeedSkeletonLoader amount={amount} />}
                </div>
                {!errorMessage && hasMore && !isLoading && (
                    <div className="flex justify-center w-full py-10">
                        <Button className="w-40" onClick={loadPosts}>
                            Load More
                        </Button>
                    </div>
                )}
                {errorMessage && <FeedError message={errorMessage} />}
                {isMobile && <UpButton />}
            </Container>
        )
    );
}
