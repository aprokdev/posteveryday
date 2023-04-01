import React from 'react';
import CardSkeleton from '@components/card-skeleton';
import { IFeedSkeletonLoaderProps } from './types';

function FeedSkeletonLoader({ amount }: IFeedSkeletonLoaderProps) {
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

export default FeedSkeletonLoader;
