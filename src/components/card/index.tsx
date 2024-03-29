import Image from 'next/image';
import Link from 'next/link';
import { ImagePlug } from '@svg';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import s from './style.module.scss';
import { ICardProps } from './types';

export default function Card(props: ICardProps): JSX.Element {
    const {
        id,
        image,
        title,
        html_preview,
        created,
        animate,
        author_firstname,
        author_lastname,
        index,
    } = props;

    const { ref, inView } = useInView({
        threshold: 0.005,
    });

    const flagRef = React.useRef<boolean>(false);

    let changableClasses = 'opacity-0 top-12';
    if ((inView || flagRef.current) && animate) {
        changableClasses = 'opacity-100 top-0';
        flagRef.current = true;
    }

    let animationClassName = '';
    if (animate) {
        animationClassName = `transition-top-opacity duration-500 ease-in ${changableClasses} `;
    }

    return (
        <Link
            href={`/posts/${id}`}
            className="hover:no-underline flex active:opacity-75 transition-opacity ease-in-out duration-150"
        >
            <article
                ref={ref}
                className={`${animationClassName}relative w-full shadow-lg border-2 border-stone-300 overflow-hidden bg-stone-100 rounded-md`}
            >
                <div className="w-full relative h-48 flex items-center justify-center bg-stone-200 border-b-2">
                    <ImagePlug />
                    <Image
                        src={image}
                        alt=""
                        className="absolute w-full h-full object-cover object-center"
                        sizes="(min-width: 640px) 640px, (min-width: 768px) 768px,
                        (min-width: 1024px) 1024px, (max-width: 1200px) 1200px"
                        fill
                        loading={index < 8 ? 'eager' : 'lazy'}
                    />
                </div>

                <div className="max-w-full p-4 lg:p-6 prose prose-sm prose-h1:font-semibold">
                    <div className="flex justify-between mb-3">
                        <span className="text-xs">
                            {author_firstname} {author_lastname}
                        </span>
                        <span className="text-xs">{created}</span>
                    </div>
                    <h1
                        className={`text-2xl mb-2 ${s.linesClipHeader} ${s.boxOrient}`}
                        title={title}
                    >
                        {title}
                    </h1>
                    <div
                        className={`${s.linesClipText} ${s.boxOrient} m-0 ${s.removeInnerMargin}`}
                        dangerouslySetInnerHTML={{ __html: html_preview }}
                    />
                </div>
            </article>
        </Link>
    );
}
