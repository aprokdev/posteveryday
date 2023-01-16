import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
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
    img: StaticImageData;
    animate?: boolean;
}

export default function Card({ img, animate }: ICardProps): JSX.Element {
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
        <article
            ref={ref}
            className={`${animationClassName}relative shadow-lg border-2 border-stone-300 overflow-hidden bg-stone-100`}
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
                    <span className="text-xs">24.11.2022</span>
                </div>
                <h1 className={`text-2xl mb-2 ${s.linesClipHeader} ${s.boxOrient}`}>
                    Garlic bread with cheese: What the science tells us tells us tells us
                </h1>
                <p className={`${s.linesClipText} ${s.boxOrient} m-0`}>
                    For years parents have espoused the health benefits of eating garlic bread with
                    cheese to their children, with the food earning such an iconic status in our
                    culture that kids will often dress up as warm, cheesy loaf for Halloween.
                </p>
            </div>
        </article>
    );
}
