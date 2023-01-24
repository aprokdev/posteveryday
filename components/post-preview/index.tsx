import Image from 'next/image';
import chemistry from 'public/chemistry.jpg';
import { useEffect, useState } from 'react';
import Button from '@components/button';
import MainContainer from '@components/main-container';
import s from './style.module.scss';

export default function PostPreview({ image, title, html, backCallback }) {
    const [state, setState] = useState(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener('load', () => setState(reader.result), false);
    }, []);

    return (
        <div className="min-h bg-grey-200">
            <div className="w-full overflow-hidden relative h-64 flex items-center justify-center bg-stone-200">
                <img src={state} alt="" className="block w-full object-cover" />
            </div>
            <MainContainer>
                <div className="mt-6">
                    <h1 className="text-6xl text-center mb-10">{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: html }} className={s.html} />
                </div>
                <div className="flex items-center justify-end py-10">
                    <Button
                        type="button"
                        className="mr-4 bg-white border-black text-black border-2"
                        onClick={() => backCallback(null)}
                    >
                        Back
                    </Button>
                    <Button type="submit" className="">
                        Publish
                    </Button>
                </div>
            </MainContainer>
        </div>
    );
}
