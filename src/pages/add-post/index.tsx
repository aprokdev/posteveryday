import Router from 'next/router';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultHTML } from 'pages/posts/plug';
import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@components/button';
import FormError from '@components/form/error';
import FileInput from '@components/form/file-input';
import Input from '@components/form/input';
import Layout from '@components/layout';
import MainContainer from '@components/main-container';
import Post from '@components/post';
import TinyEditor from '@components/tiny-editor';

export async function getServerSideProps({ req, res }) {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const session = await getLoginSession(req);
        const user = await prisma.user.findUnique({ where: { email: session?.email } });
        return {
            props: { user }, // will be passed to the page component as props
        };
    } catch (error) {
        return {
            redirect: {
                permanent: true,
                destination: '/401',
            },
        };
    }
}
export interface IFormInputs {
    Title: string;
    Image: object;
}

const defaultTitle = 'What is Lorem Ipsum?';
const schema = yup
    .object({
        Title: yup.string().required().min(20),
        Image: yup.mixed().required(),
    })
    .required();

export default function AddPost({ user }) {
    const editorRef = React.useRef<any>();
    const [preview, setPreview] = useState(null);
    const [previewMode, setPreviewMode] = useState(false);

    const { register, handleSubmit, formState, watch } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Title: defaultTitle, Image: null },
    });

    const { errors, isSubmitting } = formState;

    const onSubmit = (data: IFormInputs) => {
        const { Image, Title } = data;
        let html = '';
        if (editorRef.current) {
            html = editorRef.current.getContent();
        }
        console.log('onSubmit res: ', { image: Image[0], title: Title, html });
        setPreview({ image: Image[0], title: Title, html });
        setPreviewMode(true);
        document.documentElement.scrollTo(0, 0);
    };

    const publishPost = async () => {
        const formData = new FormData();
        formData.append('image', preview?.image);
        formData.append('title', preview?.title);
        formData.append('html', preview?.html);

        try {
            const res = await fetch('/api/posts/create', {
                method: 'POST',
                body: formData,
            });
            const result = await res.json();
            console.log('publishPost result: ', result);
            if (result.success) {
                Router.push('/my-posts');
            }
        } catch (error) {
            console.error(`publishPost error: ${error.message}`);
            return error;
        }
    };

    return (
        <Layout user={user}>
            {previewMode ? (
                <>
                    <Post
                        {...preview}
                        created={new Date()}
                        author_firstname={user.first_name}
                        author_lastname={user.last_name}
                        imageFile={preview?.image}
                    />
                    <div className="flex items-center justify-end py-10 min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4">
                        <Button
                            type="button"
                            className="mr-4 bg-white border-black text-black border-2"
                            onClick={() => setPreviewMode(false)}
                        >
                            Back
                        </Button>
                        <Button type="submit" className="" onClick={publishPost}>
                            Publish
                        </Button>
                    </div>
                </>
            ) : (
                <div className="bg-gray-200 pt-8">
                    <MainContainer>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="block">
                                <span className="text-gray-700">Post title</span>
                                <Input
                                    {...register('Title')}
                                    disabled={isSubmitting}
                                    aria-invalid={errors['Title'] ? 'true' : 'false'}
                                    autoFocus
                                />
                                <FormError>{errors['Title']?.message}</FormError>
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Post image</span>
                                <FileInput
                                    {...register('Image')}
                                    file={watch('Image')}
                                    disabled={isSubmitting}
                                    placeholder="Select image"
                                    accept="image/*,.png,.jpg,.jpeg,.web"
                                />
                                <FormError>{errors['Image']?.message}</FormError>
                            </label>

                            <span className="block">
                                <span className="block text-gray-700 mb-1">Post body</span>
                                <TinyEditor editorRef={editorRef} initialValue={preview?.html} />
                            </span>

                            <div className="flex items-center justify-end py-10">
                                <Button type="submit">Preview</Button>
                            </div>
                        </form>
                    </MainContainer>
                </div>
            )}
        </Layout>
    );
}
