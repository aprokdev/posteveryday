import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from '@icons';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { loginUser } from '../../frontend-api';
import Button from '../button';
import Input from '../input';

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
    const { reset, register, handleSubmit, formState } = useForm<ILoginFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Email: '', Password: '' },
    });

    const { errors, isSubmitting, defaultValues } = formState;

    const onSubmit = useCallback(
        async (data: ILoginFormInputs) => {
            const response = await loginUser(data);
            console.log('onSubmit res: ', response);
        },
        [reset]
    );

    return (
        <form className="w-96 rounded-lg px-8 grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
            <Link href="/feed" className="w-32 m-auto mb-6">
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
                    <span
                        className={`text-sm ${
                            errors[key]?.message ? 'text-red' : 'text-transparent'
                        }`}
                    >
                        {errors[key]?.message || 0}
                    </span>
                </label>
            ))}

            <Button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? ' opacity-80' : ''}`}
            >
                Login
            </Button>

            <span className="block text-center mt-8">
                Don't have an account? <Link href="/register">Sign up</Link>
            </span>
        </form>
    );
}
