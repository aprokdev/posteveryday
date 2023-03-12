import Image from 'next/image';
import Link from 'next/link';
import { PhotoIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import s from './style.module.scss';

// load on demand

dayjs.locale('es');

// type StaticImageData = {
//     src: string;
//     height: number;
//     width: number;
//     placeholder?: string;
// };

interface ICardProps {
    // img?: StaticImageData;
    image?: string;
    title?: string;
    html?: string;
    created?: string;
    animate?: boolean;
    id?: string;
    author_firstname: string;
    author_lastname: string;
}

const defaultTitle = 'Garlic bread with cheese: What the science tells us tells us tells us';
const defaultHTML = `For years parents have espoused the health benefits 
of eating garlic bread with
cheese to their children, with the food earning such an iconic status in our
culture that kids will often dress up as warm, cheesy loaf for Halloween.`;
const defaultIMG = '';

export default function Card(props: ICardProps): JSX.Element {
    const {
        id,
        image,
        title = defaultTitle,
        html = defaultHTML,
        created,
        animate,
        author_firstname,
        author_lastname,
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

    const date = React.useMemo(() => {
        const date = new Date(created);
        return date
            .toLocaleDateString('en-EN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .replace(/\//g, '.');
    }, [created]);

    return (
        <Link href={`/posts/${id}`} className="hover:no-underline">
            <article
                ref={ref}
                className={`${animationClassName}relative shadow-lg border-2 border-stone-300 overflow-hidden bg-stone-100 rounded-md`}
            >
                <div className="w-full relative h-48 flex items-center justify-center bg-stone-200">
                    <PhotoIcon className="block w-24 h-24 text-stone-500" />
                    <Image
                        src={`/${image}`}
                        alt="Picture of the author"
                        className="w-full h-40 object-cover object-center"
                        sizes="(min-width: 640px) 640px, (min-width: 768px) 768px,
                    (min-width: 1024px) 1024px, (max-width: 1200px) 1200px"
                        fill
                    />
                </div>

                <div className="max-w-full p-4 lg:p-6 prose prose-sm prose-h1:font-semibold">
                    <div className="flex justify-between mb-3">
                        <span className="text-xs">
                            {author_firstname} {author_lastname}
                        </span>
                        <span className="text-xs">{date}</span>
                    </div>
                    <h1 className={`text-2xl mb-2 ${s.linesClipHeader} ${s.boxOrient}`}>{title}</h1>
                    <div
                        className={`${s.linesClipText} ${s.boxOrient} m-0 ${s.removeInnerMargin}`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </article>
        </Link>
    );
}
