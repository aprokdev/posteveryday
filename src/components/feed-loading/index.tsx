import React from 'react';
import Loading from '@components/loading';

export default function FeedLoading(): JSX.Element {
    return (
        <div className="text-center py-10" key={0}>
            <Loading className="text-xl" text="Loading" dotsMargin={1} />
        </div>
    );
}
