import React from 'react';
import CardSkeleton from '@components/card-skeleton';
import { IFeedSkeletonLoaderProps } from './types';

export default function FeedSkeletonLoader({ amount }: IFeedSkeletonLoaderProps): JSX.Element {
    let arr = [];
    for (let i = 0; i < amount; i++) {
        arr.push(i);
    }
    return (
        <React.Fragment>
            {arr.map((item) => (
                <CardSkeleton key={item} />
            ))}
        </React.Fragment>
    );
}
