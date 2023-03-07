import RegisterForm from '@components/register-form';

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function LoginPage(): JSX.Element {
    return (
        <div className="flex items-center justify-center min-h">
            <RegisterForm />
        </div>
    );
}
