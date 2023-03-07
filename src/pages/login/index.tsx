import { useUser } from '@frontend/hooks/useUser';
import LoginForm from '@components/login-form';

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function LoginPage(): JSX.Element {
    const user = useUser();
    return (
        <div className="flex items-center justify-center min-h">
            <LoginForm />
        </div>
    );
}
