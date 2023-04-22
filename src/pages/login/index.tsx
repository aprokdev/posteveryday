import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '@frontend/hooks/useUser';
import LoginForm from '@components/login-form';

export async function getStaticProps() {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const { user } = useUser();
    if (user) {
        router.push('/');
        return null;
    }
    return (
        <div className="flex items-center justify-center min-h">
            <Head>
                <title>LOG IN</title>
            </Head>
            <LoginForm />
        </div>
    );
}
