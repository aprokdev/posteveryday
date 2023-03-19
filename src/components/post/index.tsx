import Image from 'next/image';
import React from 'react';
import SmallerContainer from '@components/smaller-container';
import s from './style.module.scss';
import { IPostPreviewProps } from './types';

export default function Post(props: IPostPreviewProps) {
    const { image, title, html, created, author_firstname, author_lastname, imageFile, className } =
        props;
    const img = React.useMemo(
        () => (imageFile ? URL.createObjectURL(imageFile) : null),
        [imageFile]
    );

    const date = React.useMemo(() => {
        const date = new Date(created);
        return date
            .toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .replace(/\//g, '.');
    }, [created]);

    return (
        <div className={`bg-grey-200${className ? ` ${className}` : ''}`}>
            <div className="w-full overflow-hidden relative h-72 flex items-center justify-center bg-stone-200">
                {imageFile ? (
                    <img src={img} alt="" className="block w-full object-cover" />
                ) : (
                    <Image
                        src={`/${image}`}
                        alt="Picture of the author"
                        className="w-full h-40 object-cover object-center"
                        sizes="(min-width: 640px) 640px, (min-width: 768px) 768px,
                    (min-width: 1024px) 1024px, (max-width: 1200px) 1200px"
                        fill
                    />
                )}
            </div>
            <SmallerContainer className="min-h-post">
                <div className="flex justify-between pt-8 mb-6">
                    <span className="text-md">
                        {author_firstname} {author_lastname}
                    </span>
                    <span className="text-md">{date}</span>
                </div>
                <div>
                    <h1 className="xs:text-4xl md:text-5xl xl:text-6xl text-center mb-10">
                        {title}
                    </h1>
                    <div dangerouslySetInnerHTML={{ __html: html }} className={s.html} />
                </div>
            </SmallerContainer>
        </div>
    );
}
