import React from 'react';
import Image from 'next/image';
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
}

export default function Card({ img }: ICardProps) {
    const { ref, inView } = useInView({
        threshold: 0.005,
    });

    const flagRef = React.useRef<boolean>(false);

    let changableClasses = 'opacity-0 top-12';
    if (inView || flagRef.current) {
        changableClasses = 'opacity-100 top-0';
        flagRef.current = true;
    }

    const animationClassName = `transition-top-opacity duration-500 ease-in ${changableClasses}`;
    // const animationClassName = '';

    return (
        <article
            ref={ref}
            className={`${animationClassName} ${s.nthChild} relative xs:w-full md:w-5.5/12 xl:w-1.5/4 shadow-lg rounded-lg border-2 border-stone-300 overflow-hidden xs:mb-4 sm:mb-6 lg:mb-8 xl:mb-8 bg-stone-100`}
        >
            <div className="w-full relative h-48">
                <Image
                    src={img}
                    alt="Picture of the author"
                    className="w-full h-40 object-cover object-center"
                    fill
                    // height={100}
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                />
            </div>

            <div className="max-w-full p-4 lg:p-6 prose prose-sm prose-h1:font-semibold">
                <div className="flex justify-between mb-4">
                    <span className="text-xs">Anton Prokopenko</span>
                    <span className="text-xs">24.11.2022</span>
                </div>
                <h1 className={`mb-2 ${s.linesClipHeader} ${s.boxOrient}`}>
                    Garlic bread with cheese: What the science tells us tells us tells us
                </h1>
                <p className={`${s.linesClipText} ${s.boxOrient}`}>
                    For years parents have espoused the health benefits of eating garlic bread with
                    cheese to their children, with the food earning such an iconic status in our
                    culture that kids will often dress up as warm, cheesy loaf for Halloween.
                </p>
            </div>
        </article>
    );
}
