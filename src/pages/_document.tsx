import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            {/* <Head>
                <title>POSTEVERYDAY</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=1"
                />
                <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96.png" />
            </Head> */}
            <Head />
            <body>
                <Main />
                <div id="portal"></div>
                <NextScript />
            </body>
        </Html>
    );
}
