import Link from 'next/link';
import Router from 'next/router';
import { registerUser } from '@frontend/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Checkbox from '@components/form/checkbox';
import { Logo } from '../../icons';
import Button from '../button';
import FormError from '../form/error';
import Input from '../form/input';

export interface IRegisterFormInputs {
    Email: string;
    'First name': string;
    'Last name': string;
    Password: string;
    Terms: boolean;
}

type Key = 'Email' | 'First name' | 'Last name' | 'Password' | 'Terms';

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
    const { reset, register, handleSubmit, formState } = useForm<IRegisterFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Email: '', 'First name': '', 'Last name': '', Password: '', Terms: false },
    });
    const { errors, isSubmitting, defaultValues } = formState;
    const onSubmit = useCallback(
        async (data: IRegisterFormInputs) => {
            console.log(data);

            // const response = await registerUser(data);
            // console.log('onSubmit register', response);
            // if (response?.success) {
            //     Router.push('/login');
            // }
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

            {/* <label className="flex justify-center cursor-pointer mb-2">
                <Checkbox
                    className=""
                    checked={state}
                    onChange={(e) => setState(e.target.checked)}
                    id="1"
                />
                <span className="ml-4">
                    I am agree with provided
                    <Link
                        href="/login"
                        className="ml-2 text-black underline underline-offset-2 transition-opacity hover:opacity-50"
                    >
                        Terms of use
                    </Link>
                </span>
            </label> */}

            <Button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? 'opacity-80 ' : ''}mt-2 w-full`}
            >
                Register
            </Button>

            <span className="block text-center mt-6">
                Ulready have an account?{' '}
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
