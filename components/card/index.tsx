import React from 'react';
import Image from 'next/image';
import stalkerImg from '../../public/stalker2.jpg';

type StaticImageData = {
    src: string;
    height: number;
    width: number;
    placeholder?: string;
};

interface ICardProps {
    img: StaticImageData;
    marginRight?: boolean;
}

function Card({ img, marginRight }: ICardProps) {
    return (
        <article className={`xs:w-full lg:w-5.5/12 xl:w-1.5/4 shadow-lg rounded-lg border-2 border-stone-300 overflow-hidden mb-8${marginRight ? ' lg:mr-8' : ''}`}>
            <div className="w-full relative h-60">
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

            <div className="p-4 lg:p-8 prose prose-sm prose-h1:font-semibold">
                <h1 className="">Garlic bread with cheese: What the science tells us</h1>
                <p>
                    For years parents have espoused the health benefits of eating garlic bread with
                    cheese to their children, with the food earning such an iconic status in our
                    culture that kids will often dress up as warm, cheesy loaf for Halloween.
                </p>
            </div>
        </article>
    );
}

export default Card;
