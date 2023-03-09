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
            <Container>
                <p>Email: {user.email}</p>
                <p>First name: {user.first_name}</p>
                <p>Last name: {user.last_name}</p>
            </Container>
        </Layout>
    );
}

export default Profile;
