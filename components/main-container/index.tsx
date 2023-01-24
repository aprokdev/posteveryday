export default function MainContainer({ children }) {
    return (
        <main className="min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4 min-h-mch">
            {children}
        </main>
    );
}
