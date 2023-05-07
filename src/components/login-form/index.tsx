import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@frontend/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from '@svg';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@components/button';
import FormError from '@components/form/error';
import Input from '@components/form/input';

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
    const router = useRouter();
    const { reset, register, setError, handleSubmit, formState } = useForm<ILoginFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Email: '', Password: '' },
    });

    const { errors, isSubmitting, defaultValues } = formState;

    const onSubmit = useCallback(
        async (data: ILoginFormInputs, event): Promise<void> => {
            event.preventDefault();
            const response = await loginUser(data);
            // if response success, redirect on page level
            if (response?.message === 'Provided credentials are invalid') {
                setError('Email', { type: 'custom', message: response?.message });
                setError('Password', { type: 'custom', message: response?.message });
            }
            console.log('onSubmit res: ', response);
        },
        [reset, setError]
    );

    return (
        <form className="w-96 rounded-lg p-8 grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
            <Link href="/" className="w-32 m-auto mb-6">
                <Logo />
            </Link>

            {Object.entries(defaultValues).map(([key]: [Key, string]) => (
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
            ))}

            <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
                {isSubmitting ? 'Loading...' : 'Login'}
            </Button>

            <span className="block text-center mt-8">
                Don't have an account?{' '}
                <Link
                    href="/register"
                    className="text-black underline underline-offset-2 transition-opacity hover:opacity-50"
                >
                    Register
                </Link>
            </span>
        </form>
    );
}
