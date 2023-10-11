import Link from 'next/link';
import Router from 'next/router';
import { registerUser } from '@frontend/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from '@svg';
import { useCallback } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@components/button';
import Checkbox from '@components/form/checkbox';
import FormError from '@components/form/error';
import Input from '@components/form/input';
import { IRegisterFormInputs, Key } from './types';

const schema = yup
    .object({
        Email: yup.string().required().email(),
        'First name': yup.string().required().min(2),
        'Last name': yup.string().required().min(2),
        Password: yup.string().required().min(6),
        Terms: yup.boolean().oneOf([true], 'This is a required field'),
    })
    .required();

export default function RegisterForm(): JSX.Element {
    const { reset, register, setError, handleSubmit, formState } = useForm<IRegisterFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Email: '', 'First name': '', 'Last name': '', Password: '', Terms: false },
    });

    const { errors, isSubmitting, defaultValues } = formState;

    const onSubmit = useCallback(
        async (data: IRegisterFormInputs): Promise<void> => {
            const response = await registerUser(data);
            console.log('onSubmit register', response);
            if (response?.success) {
                Router.push('/login');
            } else if (response?.message === 'User with provided email is already exist') {
                setError('Email', {
                    type: 'custom',
                    message: 'User with provided email is already exist',
                });
            }
        },
        [reset]
    );

    return (
        <form className="w-96 rounded-lg p-8 grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
            <Link href="/" className="w-32 m-auto mb-6">
                <Logo />
            </Link>

            {Object.entries(defaultValues).map(([key]: [Key, string]) => {
                if (key === 'Terms') {
                    return (
                        <label className="block" key={key}>
                            <div className="flex cursor-pointer">
                                <Checkbox
                                    {...register(key)}
                                    id="terms-cb"
                                    error={errors[key]?.message}
                                />
                                <span className="ml-3">
                                    I have read and agree with
                                    <Link
                                        href="/terms"
                                        target="__blank"
                                        rel="noreferrer noopener"
                                        className="ml-2 text-black underline underline-offset-2 transition-opacity hover:opacity-50"
                                    >
                                        terms of use
                                    </Link>
                                </span>
                            </div>
                            <FormError>{errors[key]?.message}</FormError>
                        </label>
                    );
                } else {
                    return (
                        <label className="block" key={key}>
                            <span className="text-gray-700">
                                {key}
                                <span className="text-red ml-1">*</span>
                            </span>
                            <Input
                                {...register(key)}
                                disabled={isSubmitting}
                                type={key === 'Password' ? 'password' : null}
                                aria-invalid={errors[key] ? 'true' : 'false'}
                            />
                            <FormError>{errors[key]?.message}</FormError>
                        </label>
                    );
                }
            })}

            <Button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? 'opacity-80 ' : ''}mt-2 w-full`}
            >
                Register
            </Button>

            <span className="block text-center mt-6">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="text-black underline underline-offset-2 transition-opacity hover:opacity-50"
                >
                    Log in
                </Link>
            </span>
        </form>
    );
}
