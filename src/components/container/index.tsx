function Container({ children }) {
    return (
        <main className="min-w-375 mx-auto sm:px-6 lg:px-8 xs:px-4 min-h-mch bg-gray-200 pt-6 pb-10">
            {children}
        </main>
    );
}

export default Container;
