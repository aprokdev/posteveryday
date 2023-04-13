import Image from 'next/image';
import React from 'react';
import SmallerContainer from '@components/smaller-container';
import s from './style.module.scss';
import { IPostPreviewProps } from './types';

export default function Post(props: IPostPreviewProps) {
    const { image, title, html, created, author_firstname, author_lastname, imageFile, className } =
        props;

    const img = React.useMemo(
        () => (imageFile ? URL.createObjectURL(imageFile) : image),
        [imageFile]
    );

    return (
        <div className={`bg-grey-200${className ? ` ${className}` : ''}`}>
            <div className="w-full overflow-hidden relative min-h-72 flex xs:py-4 md:py-8 items-center justify-center bg-stone-200">
                <Image
                    src={img}
                    alt="Picture of the author"
                    className="w-full h-40 object-cover object-center"
                    sizes="(min-width: 640px) 640px, (min-width: 768px) 768px,
                    (min-width: 1024px) 1024px, (max-width: 1200px) 1200px"
                    fill
                />
                <SmallerContainer className="relative flex content-center">
                    <h1
                        className={`xs:text-4xl md:text-5xl xl:text-6xl text-center text-white ${s.header}`}
                    >
                        {title}
                    </h1>
                </SmallerContainer>
            </div>
            <SmallerContainer>
                <div className="flex justify-between pt-8 mb-6">
                    <span className="text-md">
                        {author_firstname} {author_lastname}
                    </span>
                    <span className="text-md">{created}</span>
                </div>
                {/* <h1 className="xs:text-4xl md:text-5xl xl:text-6xl mb-10 text-center">{title}</h1> */}
                <div>
                    <div
                        dangerouslySetInnerHTML={{ __html: html }}
                        className={`mce-content-body ${s.html}`}
                    />
                </div>
            </SmallerContainer>
        </div>
    );
}
