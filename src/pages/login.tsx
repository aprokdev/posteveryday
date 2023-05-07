import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '@frontend/hooks/useUser';
import { useEffect, useState } from 'react';
import LoginForm from '@components/login-form';
import LoginFormSkeleton from '@components/login-form/skeleton';

export async function getStaticProps() {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const { user, isLoading } = useUser();
    if (user) {
        router.push('/my-posts');
        return (
            <div className="flex items-center justify-center min-h">
                <Head>
                    <title>LOG IN</title>
                </Head>
                <LoginFormSkeleton />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h">
            <Head>
                <title>LOG IN</title>
            </Head>
            {!isLoading ? <LoginForm /> : <LoginFormSkeleton />}
        </div>
    );
}
