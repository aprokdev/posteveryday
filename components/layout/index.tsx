import Header from '../header';
import Footer from '../footer';

function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="mx-auto sm:px-6 lg:px-8 xs:px-4 pt-6 min-h-mch bg-gray-200">
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;
