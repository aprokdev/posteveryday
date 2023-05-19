import React from 'react';

export default function Footer(): JSX.Element {
    return (
        <footer className="bg-stone-600">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-10 items-center justify-center">
                    <span className="text-center xs:text-xs sm:text-sm lg:text-sm text-white">
                        © {new Date().getFullYear()} Anton Prokopenko
                    </span>
                </div>
            </div>
        </footer>
    );
}
