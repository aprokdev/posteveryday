// import { post } from 'frontend-api';
import { useEffect, useState } from 'react';
import Button from '@components/button';
import MainContainer from '@components/main-container';
import s from './style.module.scss';

export default function PostPreview({ image, title, html, backCallback }) {
    const [url, setURL] = useState(null);

    useEffect(() => {
        setURL(URL.createObjectURL(image));
    }, []);

    const publish = async () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('html', html);

        try {
            const res = await fetch('/api/blogs/create', {
                method: 'POST',
                body: formData,
            });
            const result = res.json();
            console.log('publish result: ', result);
        } catch (error) {
            console.error(`post() error: ${error.message}`);
            return error;
        }
    };

    return (
        <div className="min-h bg-grey-200">
            <div className="w-full overflow-hidden relative h-72 flex items-center justify-center bg-stone-200">
                <img src={url} alt="" className="block w-full object-cover" />
            </div>
            <MainContainer>
                <div className="mt-6">
                    <h1 className="xs:text-4xl md:text-5xl xl:text-6xl text-center mb-10">
                        {title}
                    </h1>
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
                    <Button type="submit" className="" onClick={publish}>
                        Publish
                    </Button>
                </div>
            </MainContainer>
        </div>
    );
}
