import React from 'react';

function Footer() {
    return (
        <footer className="bg-stone-400">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-10 items-center justify-center">
                    <span className="text-center xs:text-xs sm:text-sm lg:text-sm text-white">
                        Copyright © {new Date().getFullYear()} Anton Prokopenko
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
