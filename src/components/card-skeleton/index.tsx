import Image from 'next/image';
import ImagePlug from '@public/images/image-plug.svg';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import s from './style.module.scss';

export default function CardSkeleton(): JSX.Element {
    return (
        <article className="relative w-full shadow-lg border-2 border-stone-300 overflow-hidden bg-stone-100 rounded-md">
            <div className="w-full relative h-48 flex items-center justify-center bg-stone-200">
                <div className="relative w-24 h-24">
                    <Image
                        src={ImagePlug}
                        alt="Picture of the author"
                        className="w-10 h-10 object-cover object-center text-stone-500"
                        sizes="(min-width: 640px) 640px, 33vw"
                        fill
                        loading="eager"
                    />
                </div>
            </div>

            <div className="max-w-full p-4 lg:p-6 prose prose-sm prose-h1:font-semibold">
                <div className="flex justify-between mb-3">
                    <div className="text-xs w-28">
                        <Skeleton count={1} />
                    </div>
                    <div className="text-xs w-20">
                        <Skeleton count={1} />
                    </div>
                </div>
                <h1 className={`text-2xl mb-2 ${s.linesClipHeader} ${s.boxOrient}`}>
                    <Skeleton count={1} />
                </h1>
                <div className={`${s.linesClipText} ${s.boxOrient} m-0 ${s.removeInnerMargin}`}>
                    <Skeleton count={2} />
                </div>
            </div>
        </article>
    );
}
