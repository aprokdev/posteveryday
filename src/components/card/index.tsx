import Image from 'next/image';
import Link from 'next/link';
import { PhotoIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import s from './style.module.scss';

type StaticImageData = {
    src: string;
    height: number;
    width: number;
    placeholder?: string;
};

interface ICardProps {
    img?: StaticImageData;
    title?: string;
    html?: string;
    createdAt?: string;
    animate?: boolean;
    id?: string;
}

const defaultTitle = 'Garlic bread with cheese: What the science tells us tells us tells us';
const defaultHTML = `For years parents have espoused the health benefits 
of eating garlic bread with
cheese to their children, with the food earning such an iconic status in our
culture that kids will often dress up as warm, cheesy loaf for Halloween.`;
const defaultIMG = '';

export default function Card({
    img,
    title = defaultTitle,
    html = defaultHTML,
    createdAt,
    animate,
    id,
}: ICardProps): JSX.Element {
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

    console.log();

    return (
        <Link href={`/posts/${id}`}>
            <article
                ref={ref}
                className={`${animationClassName}relative shadow-lg border-2 border-stone-300 overflow-hidden bg-stone-100 rounded-md`}
            >
                <div className="w-full relative h-48 flex items-center justify-center bg-stone-200">
                    <PhotoIcon className="block w-24 h-24 text-stone-500" />
                    <Image
                        src={img}
                        alt="Picture of the author"
                        className="w-full h-40 object-cover object-center"
                        sizes="(min-width: 640px) 640px, (min-width: 768px) 768px,
                    (min-width: 1024px) 1024px, (max-width: 1200px) 1200px"
                        fill
                    />
                </div>

                <div className="max-w-full p-4 lg:p-6 prose prose-sm prose-h1:font-semibold">
                    <div className="flex justify-between mb-3">
                        <span className="text-xs">Anton Prokopenko</span>
                        <span className="text-xs">{createdAt}</span>
                    </div>
                    <h1 className={`text-2xl mb-2 ${s.linesClipHeader} ${s.boxOrient}`}>{title}</h1>
                    <p
                        className={`${s.linesClipText} ${s.boxOrient} m-0`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </article>
        </Link>
    );
}
