import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>POSTEVERYDAY</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=1"
                />
                <meta name="description" content="Just pet-project for practice" />
                <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
