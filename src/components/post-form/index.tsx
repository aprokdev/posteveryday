import { yupResolver } from '@hookform/resolvers/yup';
import defaultHTML from 'pages/posts/plug';
import { useRef } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import FormError from '@components/form/error';
import ImageInput from '@components/form/file-input';
import Input from '@components/form/input';
import TinyEditor from '@components/tiny-editor';
import { IPostFormProps } from './types';

export interface IFormInputs {
    Title: string;
    Image: object;
    Body: string;
}

const schema = yup
    .object({
        Title: yup.string().required().min(20),
        Image: yup.mixed().required(),
        Body: yup.string().required().min(20),
    })
    .required();

const defaultTitle = 'What is lorem ipsum dolor?';
const defhtml = defaultHTML();

function PostForm({
    image = null,
    title = defaultTitle,
    html = defhtml,
    onSubmit,
    children,
}: IPostFormProps) {
    console.log('PostForm props', { image, title, html });

    const editorRef = useRef<any>();

    const methods = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Title: title, Image: image, Body: html },
    });
    const { register, handleSubmit, formState, watch, setError } = methods;

    const { errors, isSubmitting } = formState;

    const onSubmitHandler = (data: IFormInputs) => {
        const { Image, Title, Body } = data;
        let html = '';
        if (editorRef.current) {
            html = editorRef.current.getContent();
        }
        if (!Image || !Image[0]) {
            setError('Image', { type: 'custom', message: 'Image is a required field' });
            return;
        }
        console.log('onSubmit res: ', { image: Image[0], title: Title, html: Body });
        document.documentElement.scrollTo(0, 0);
        onSubmit({ image: Image[0], title: Title, html: Body });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                    <ImageInput
                        {...register('Image')}
                        file={watch('Image')}
                        disabled={isSubmitting}
                        placeholder="Select image"
                        accept="image/*,.png,.jpg,.jpeg,.web"
                    />
                    <FormError>{errors['Image']?.message}</FormError>
                </label>

                <label className="block">
                    <span className="block text-gray-700 mb-1">Post body</span>
                    {/* <TinyEditor editorRef={editorRef} initialValue={html} {...register('HTML')} /> */}
                    <TinyEditor {...register('Body')} initialValue={html} />
                    <FormError>{errors['Body']?.message}</FormError>
                </label>

                <div className="flex items-center justify-end py-10">{children}</div>
            </form>
        </FormProvider>
    );
}

export default PostForm;
