import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from '@icons';
import Link from 'next/link';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import Input from '../input';

interface IFormInputs {
    Email: string;
    'First name': string;
    'Last name': string;
    Password: string;
}

const schema = yup
    .object({
        Email: yup.string().required().email(),
        'First name': yup.string().required().min(2),
        'Last name': yup.string().required().min(2),
        Password: yup.string().required().min(6),
    })
    .required();

console.log('schema', schema);

export default function LoginPage(): JSX.Element {
    const { control, register, handleSubmit, formState } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });
    const { errors, isLoading, isSubmitting, touchedFields } = formState;
    const onSubmit = async (data: IFormInputs) => {
        let body = {};
        for (const key in data) {
            console.log(key);
            body[key.replace(/ /i, '_').toLowerCase()] = data[key];
        }
        const res = await fetch('/api/register', { method: 'POST', body: JSON.stringify(body) });
        const result = await res.json();
        console.log(JSON.parse(result.body));
    };

    console.log(errors);

    return (
        <form
            className="w-96 rounded-lg px-8 pb-10 grid grid-cols-1 gap-1"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Link href="/feed" className="w-24 m-auto">
                <Logo />
            </Link>
            <label className="block">
                <span className="text-gray-700">Email</span>
                <Input {...register('Email')} aria-invalid={errors['Email'] ? 'true' : 'false'} />
                <span
                    className={`text-sm ${
                        errors['Email']?.message ? 'text-red' : 'text-transparent'
                    }`}
                >
                    {errors['Email']?.message || 0}
                </span>
            </label>
            <label className="block">
                <span className="text-gray-700">First name</span>
                <Input
                    {...register('First name')}
                    aria-invalid={errors['First name'] ? 'true' : 'false'}
                />
                <span
                    className={`text-sm ${
                        errors['First name']?.message ? 'text-red' : 'text-transparent'
                    }`}
                >
                    {errors['First name']?.message || 0}
                </span>
            </label>
            <label className="block">
                <span className="text-gray-700">Last name</span>
                <Input
                    {...register('Last name')}
                    aria-invalid={errors['Last name'] ? 'true' : 'false'}
                />
                <span
                    className={`text-sm ${
                        errors['Last name']?.message ? 'text-red' : 'text-transparent'
                    }`}
                >
                    {errors['Last name']?.message || 0}
                </span>
            </label>
            <label className="block">
                <span className="text-gray-700">Password</span>
                <Input
                    {...register('Password')}
                    aria-invalid={errors['Password'] ? 'true' : 'false'}
                />
                <span
                    className={`text-sm ${
                        errors['Password']?.message ? 'text-red' : 'text-transparent'
                    }`}
                >
                    {errors['Password']?.message || 0}
                </span>
            </label>
            <button
                type="submit"
                className="block mt-4 shadow-lg duration-200 cursor-pointer text-center rounded-md bg-black hover:opacity-80 active:opacity-100 py-3 px-4 text-[0.8125rem] font-semibold leading-5 text-white "
            >
                Register
            </button>
        </form>
    );
}
