export default function FeedError({ message }) {
    return (
        <div className="flex flex-col items-center justify-center w-full xs:pb-20 sm:pb-0">
            <h1 className="block mb-5 text-center w-full xs:text-2xl md:text-4xl">
                Error: {message}
            </h1>
            <p>You can try again</p>
        </div>
    );
}
