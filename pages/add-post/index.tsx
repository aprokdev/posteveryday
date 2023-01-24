import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@components/button';
import FormError from '@components/form/error';
import FileInput from '@components/form/file-input';
import Input from '@components/form/input';
import Layout from '@components/layout';
import MainContainer from '@components/main-container';
import TinyEditor from '@components/tiny-editor';

export interface IFormInputs {
    Title: string;
    Image: object;
}

const schema = yup
    .object({
        Title: yup.string().required().min(5),
        Image: yup.mixed().required(),
    })
    .required();

function AddPost() {
    const editorRef = React.useRef<any>();

    const { register, handleSubmit, formState, watch } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Title: '', Image: null },
    });

    const { errors, isSubmitting } = formState;

    const onSubmit = React.useCallback(async (data: IFormInputs) => {
        let html = '';
        if (editorRef.current) {
            html = editorRef.current.getContent();
        }
        console.log('onSubmit res: ', { ...data, html });
    }, []);

    return (
        <Layout>
            <div className="bg-gray-200 py-8">
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
                            />
                            <FormError>{errors['Image']?.message}</FormError>
                        </label>

                        <span className="block">
                            <span className="block text-gray-700 mb-1">Post body</span>
                            <TinyEditor editorRef={editorRef} />
                        </span>

                        <Button type="submit" className="mt-8">
                            Preview
                        </Button>
                    </form>
                </MainContainer>
            </div>
        </Layout>
    );
}

export default AddPost;
