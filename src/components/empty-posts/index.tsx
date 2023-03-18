import Link from 'next/link';

function EmptyPosts({ user }) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-mainMin">
            <h1 className="block mb-5 text-center w-full text-4xl">There are no posts yet</h1>
            <p>
                You can {!user && <Link href="/login">log in</Link>} {!user && 'and'} create one ;D
            </p>
        </div>
    );
}

export default EmptyPosts;
