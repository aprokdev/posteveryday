export default function FeedCardsContainer({ children }): JSX.Element {
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4">
            {children}
        </div>
    );
}
