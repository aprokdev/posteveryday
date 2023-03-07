import Router from 'next/router';
import { useUser } from '@frontend/hooks/useUser';
import Container from '@components/container';
import Layout from '@components/layout';

function Profile() {
    const user = useUser();
    if (!user) {
        return null;
    }
    return (
        <Layout user={user}>
            <Container>Welcome to Profile!</Container>
        </Layout>
    );
}

export default Profile;
