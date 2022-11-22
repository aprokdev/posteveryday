import React from 'react';
import Image from 'next/image';
import stalkerImg from '../../public/stalker2.jpg';

function Card() {
    return (
        <article className="w-1/4 shadow-lg rounded-lg border-2 overflow-hidden shrink-0 mr-8 mb-8 basis-500">
            <div className="w-full relative h-60">
                <Image
                    src={stalkerImg}
                    alt="Picture of the author"
                    className="w-500 h-40 object-cover object-center"
                    fill
                    // height={100}
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                />
            </div>

            <div className="p-8 prose sm:prose-sm lg:prose-sm">
                <h1>Garlic bread with cheese: What the science tells us</h1>
                <p>
                    For years parents have espoused the health benefits of eating garlic bread with
                    cheese to their children, with the food earning such an iconic status in our
                    culture that kids will often dress up as warm, cheesy loaf for Halloween.
                </p>
                <p>
                    But a recent study shows that the celebrated appetizer may be linked to a series
                    of rabies cases springing up around the country.
                </p>
            </div>
        </article>
    );
}

export default Card;
