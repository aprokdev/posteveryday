import { IFeedErrorProps } from './types';

export default function FeedError({ message }: IFeedErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full pt-10 px-5">
            <p className="block mb-5 text-center w-full xs:text-xl">
                Error during the feed scroll: {message}
            </p>
            <p className="block mb-5 text-center w-full xs:text-sm md:text-md">
                You can update the page and try again
            </p>
        </div>
    );
}
