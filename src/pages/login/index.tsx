import { useUser } from '@backend/hooks';
import LoginForm from '@components/login-form';

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function LoginPage(): JSX.Element {
    useUser({ redirectTo: '/', redirectIfFound: true });
    return (
        <div className="flex items-center justify-center min-h">
            <LoginForm />
        </div>
    );
}
