import Link from 'next/link';
import { registerUser } from '@frontend/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Logo } from '../../icons';
import Button from '../button';
import FormError from '../form/error';
import Input from '../form/input';

export interface IRegisterFormInputs {
    Email: string;
    'First name': string;
    'Last name': string;
    Password: string;
}

type Key = 'Email' | 'First name' | 'Last name' | 'Password';

const schema = yup
    .object({
        Email: yup.string().required().email(),
        'First name': yup.string().required().min(2),
        'Last name': yup.string().required().min(2),
        Password: yup.string().required().min(6),
    })
    .required();

export default function RegisterForm(): JSX.Element {
    const { reset, register, handleSubmit, formState } = useForm<IRegisterFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Email: '', 'First name': '', 'Last name': '', Password: '' },
    });
    const { errors, isSubmitting, defaultValues } = formState;
    const onSubmit = useCallback(
        async (data: IRegisterFormInputs) => {
            const response = await registerUser(data);
            console.log('onSubmit register', response);
        },
        [reset]
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

            <Button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? ' opacity-80' : ''}mt-4`}
            >
                Register
            </Button>

            <span className="block text-center mt-8">
                Ulready have an account? <Link href="/login">Sign in</Link>
            </span>
        </form>
    );
}
