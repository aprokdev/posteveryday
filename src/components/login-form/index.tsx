import Link from 'next/link';
import Router from 'next/router';
import { loginUser } from '@frontend/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@components/button';
import FormError from '@components/form/error';
import Input from '@components/form/input';
import { Logo } from '../../icons';

export interface ILoginFormInputs {
    Email: string;
    Password: string;
}

type Key = 'Email' | 'Password';

const schema = yup
    .object({
        Email: yup.string().required().email(),
        Password: yup.string().required().min(6),
    })
    .required();

export default function LoginForm(): JSX.Element {
    const { reset, register, setError, handleSubmit, formState } = useForm<ILoginFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Email: '', Password: '' },
    });

    const { errors, isSubmitting, defaultValues } = formState;

    const onSubmit = useCallback(
        async (data: ILoginFormInputs) => {
            const response = await loginUser(data);
            if (response?.success) {
                Router.push('/my-posts');
            } else if (response?.message === "User doesn't exist") {
                setError('Email', { type: 'custom', message: "User doesn't exist" });
            } else if (response?.message === 'Invalid password') {
                setError('Password', { type: 'custom', message: 'Invalid password' });
            }
            console.log('onSubmit res: ', response);
        },
        [reset, setError]
    );

    return (
        <form className="w-96 rounded-lg px-8 grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
            <Link href="/" className="w-32 m-auto mb-6">
                <Logo />
            </Link>

            {Object.entries(defaultValues).map(([key]: [Key, string]) => (
                <label className="block" key={key}>
                    <span className="text-gray-700">{key}</span>
                    <Input
                        {...register(key)}
                        disabled={isSubmitting}
                        aria-invalid={errors[key] ? 'true' : 'false'}
                    />
                    <FormError>{errors[key]?.message}</FormError>
                </label>
            ))}

            <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
                {isSubmitting ? 'Loading...' : 'Login'}
            </Button>

            <span className="block text-center mt-8">
                Don't have an account? <Link href="/register">Register</Link>
            </span>
        </form>
    );
}
