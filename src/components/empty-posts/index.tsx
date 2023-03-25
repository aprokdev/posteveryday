import Link from 'next/link';

function EmptyPosts({ user }) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-mainMin xs:pb-20 sm:pb-0">
            <h1 className="block mb-5 text-center w-full xs:text-2xl md:text-4xl">
                There are no posts yet
            </h1>
            <p className="xs:text-xl">
                You can {!user && <Link href="/login">log in</Link>} {!user && 'and'}{' '}
                <Link
                    href="/add-post"
                    className="text-black underline underline-offset-2 transition-opacity hover:opacity-50"
                >
                    create
                </Link>{' '}
                one ;D
            </p>
        </div>
    );
}

export default EmptyPosts;
