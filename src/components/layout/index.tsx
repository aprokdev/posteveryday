import Footer from '../footer';
import Header from '../header';

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
