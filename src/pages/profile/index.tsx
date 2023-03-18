import Router from 'next/router';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import { useUser } from '@frontend/hooks/useUser';
import Container from '@components/container';
import Layout from '@components/layout';

export async function getServerSideProps({ req, res }) {
    try {
        const session = await getLoginSession(req);
        let user = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
            const { hash, salt, ...rest } = user;
            user = rest;
            return { props: { user } };
        } else {
            return {
                redirect: {
                    destination: '/401',
                    permanent: true,
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

function Profile({ user }) {
    // const user = useUser();
    if (!user) {
        return null;
    }
    return (
        <Layout user={user}>
            <Container className="min-h-mainMin">
                <p>Email: {user.email}</p>
                <p>First name: {user.first_name}</p>
                <p>Last name: {user.last_name}</p>
            </Container>
        </Layout>
    );
}

export default Profile;
