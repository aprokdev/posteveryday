import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from '@icons';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../button';
import Input from '../input';

interface IFormInputs {
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
    const { reset, register, handleSubmit, formState } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: { Email: '', 'First name': '', 'Last name': '', Password: '' },
    });
    const { errors, isSubmitting, defaultValues } = formState;
    const onSubmit = useCallback(
        async (data: IFormInputs) => {
            let body = {};
            for (const key in data) {
                body[key.replace(/ /i, '_').toLowerCase()] = data[key];
            }
            try {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(body),
                }).then((res) => res.json());
                reset();
            } catch (error) {
                alert(`error: ${error.message}`);
            }
        },
        [reset]
    );

    console.log(errors);

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
                Register
            </Button>

            <span className="block text-center mt-8">
                Ulready have an account? <Link href="/login">Sign in</Link>
            </span>
        </form>
    );
}
