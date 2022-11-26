import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>POST EVERYDAY</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
