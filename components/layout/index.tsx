import Head from 'next/head';
import Header from '../header';
import Footer from '../footer';

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>POSTEVERYDAY</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/png" sizes="16x16" href="../../public/favicon.ico"></link>
            </Head>
            <Header />
            <main className="mx-auto sm:px-6 lg:px-8 xs:px-4 min-h-mch bg-gray-200 pt-6">
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;
