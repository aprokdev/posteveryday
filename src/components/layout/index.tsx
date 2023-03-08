import Router from 'next/router';
import Footer from '@components/footer';
import Header from '@components/header';

function Layout({ user, children }) {
    return (
        <>
            <Header user={user} />
            {children}
            <Footer />
        </>
    );
}

export default Layout;
