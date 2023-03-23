import Head from 'next/head';
import SmallerContainer from '@components/smaller-container';

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function TermsOfUsePage(): JSX.Element {
    return (
        <div className="min-h">
            <Head>
                <title>Terms Of Use - POSTEVERYDAY</title>
            </Head>
            <SmallerContainer className="min-h-post">lol</SmallerContainer>
        </div>
    );
}
