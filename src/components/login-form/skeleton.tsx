import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import Button from '@components/button';
import FormError from '@components/form/error';

export default function LoginFormSkeleton() {
    return (
        <div className="w-96 rounded-lg p-8 grid grid-cols-1">
            <div className="relative w-32 m-auto mb-6" style={{ height: '41.48px' }}>
                <Skeleton className="absolute w-32 h-full" style={{ top: 0 }} />
            </div>

            <label className="block">
                <span className="block text-gray-700 mb-1">
                    Email
                    <span className="text-red ml-1">*</span>
                </span>
                <div className="relative" style={{ height: '50.8px' }}>
                    <Skeleton className="absolute h-full" style={{ top: 0 }} />
                </div>
                <FormError></FormError>
            </label>

            <label className="block">
                <span className="block text-gray-700 mb-1">
                    Password
                    <span className="text-red ml-1">*</span>
                </span>
                <div className="relative" style={{ height: '50.8px' }}>
                    <Skeleton className="absolute h-full" style={{ top: 0 }} />
                </div>
                <FormError></FormError>
            </label>

            <Button type="submit" disabled className="mt-4 w-full">
                Login
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
        </div>
    );
}
