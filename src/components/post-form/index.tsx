import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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

function PostForm({ title, html, onSubmit, children, imageValidation }: IPostFormProps) {
    const editorRef = useRef<any>();

    const methods = useForm<IFormInputs>({
        resolver: yupResolver(
            yup
                .object({
                    Title: yup.string().required().min(20),
                    Image: imageValidation ? yup.mixed().required() : yup.mixed(),
                    Body: yup.string().required().min(20),
                })
                .required()
        ),
        defaultValues: { Title: title, Image: null, Body: html },
    });
    const { register, handleSubmit, formState, watch, setError } = methods;

    const { errors, isSubmitting } = formState;

    const onSubmitHandler = (data: IFormInputs) => {
        const { Image, Title, Body } = data;
        let html = '';
        if (editorRef.current) {
            html = editorRef.current.getContent();
        }
        const submitData = {
            image: imageValidation ? Image[0] : Image ? Image[0] : null,
            title: Title,
            html: Body,
        };
        // console.log('onSubmit submitData: ', submitData);
        document.documentElement.scrollTo(0, 0);
        onSubmit(submitData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label className="block">
                    <span className="text-gray-700">
                        Post title<span className="text-red ml-1">*</span>
                    </span>
                    <Input
                        {...register('Title')}
                        disabled={isSubmitting}
                        aria-invalid={errors['Title'] ? 'true' : 'false'}
                        autoFocus
                        placeholder="Enter your title..."
                    />
                    <FormError>{errors['Title']?.message}</FormError>
                </label>

                <label className="block">
                    <span className="text-gray-700">
                        Post image<span className="text-red ml-1">*</span>
                    </span>
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
                    <span className="block text-gray-700 mb-1">
                        Post body<span className="text-red ml-1">*</span>
                    </span>
                    <TinyEditor {...register('Body')} initialValue={html} />
                    <FormError>{errors['Body']?.message}</FormError>
                </label>

                <div className="flex items-center justify-end py-10">{children}</div>
            </form>
        </FormProvider>
    );
}

export default PostForm;
