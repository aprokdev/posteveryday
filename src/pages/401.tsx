import Link from 'next/link';

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function FourZeroOne() {
    return (
        <div className="flex flex-col items-center justify-center min-h">
            <h1 className="block mb-5 text-center w-full text-5xl">401</h1>
            <p>
                You should <Link href="/login">log in</Link> to perform this action
            </p>
        </div>
    );
}
