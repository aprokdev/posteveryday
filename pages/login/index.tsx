import { Logo } from '@icons';
import Link from 'next/link';
import Input from '../../components/input';

export default function LoginPage(): JSX.Element {
    return (
        <div className="flex items-center justify-center min-h">
            <form className="w-96 rounded-lg px-8 pb-10 grid grid-cols-1 gap-6">
                <Link href="/feed" className="w-24 m-auto">
                    <Logo />
                </Link>
                <label className="block">
                    <span className="text-gray-700">Email</span>
                    <Input />
                </label>
                <label className="block">
                    <span className="text-gray-700">First name</span>
                    <Input />
                </label>
                <label className="block">
                    <span className="text-gray-700">Last name</span>
                    <Input />
                </label>
                <label className="block">
                    <span className="text-gray-700">Password</span>
                    <Input />
                </label>
                <div className="block mt-4 shadow-lg duration-200 cursor-pointer text-center rounded-md bg-black hover:bg-slate-800 active:bg-black py-3 px-4 text-[0.8125rem] font-semibold leading-5 text-white ">
                    Register
                </div>
            </form>
        </div>
    );
}
