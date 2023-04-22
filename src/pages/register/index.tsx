import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '@frontend/hooks/useUser';
import RegisterForm from '@components/register-form';

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function RegisterPage(): JSX.Element {
    const router = useRouter();
    const { user } = useUser();
    if (user) {
        router.push('/');
        return null;
    }
    return (
        <div className="flex items-center justify-center min-h">
            <Head>
                <title>REGISTER USER</title>
            </Head>
            <RegisterForm />
        </div>
    );
}
