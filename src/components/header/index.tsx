import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '@public/images/logo.svg';
import React from 'react';
import HeaderLink from './header-link';
import HeaderProfile from './header-profile';

export default function Header({ user }) {
    const [isMobileMenuIsOpened, setMobileMenuIsOpened] = React.useState<boolean>(false);

    const headerRef = React.useRef<HTMLElement>();

    const [isHeaderAttached, setAttached] = React.useState<boolean>(false);

    React.useEffect(() => {
        // attaching header to top of viewport after scrolling page down
        function handleScroll({ target }) {
            const pageScroll = target.documentElement.scrollTop;
            if (pageScroll > 400) {
                headerRef.current.classList.add('fixed');
                document.documentElement.classList.add('pt-16');
                setAttached(true);
            }
            if (pageScroll === 0) {
                headerRef.current.classList.remove('fixed');
                document.documentElement.classList.remove('pt-16');
                setAttached(false);
            }
        }
        window.addEventListener('scroll', handleScroll, false);
        return () => {
            window.removeEventListener('scroll', handleScroll, false);
            document.documentElement.classList.remove('pt-16');
        };
    }, [setAttached]);

    const style = {
        top: isHeaderAttached ? '0' : '-72px',
    };

    return (
        <nav
            className="w-full lg:w-full min-w-375 bg-stone-100 z-20 shadow-xl ease-in duration-500 transition-top"
            style={style}
            ref={headerRef}
            id="#header"
        >
            <div className="relative mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {user && (
                        <div className="absolute inset-y-0 left-0 flex items-center md:hidden z-20">
                            <button
                                type="button"
                                className="block h-10 w-10 rounded-md p-2 text-white hover:text-white focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => setMobileMenuIsOpened(!isMobileMenuIsOpened)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuIsOpened ? (
                                    <XMarkIcon className="block w-full h-full text-stone-800" />
                                ) : (
                                    <Bars3Icon className="block w-full h-full text-stone-800" />
                                )}
                            </button>
                        </div>
                    )}

                    <div
                        className={`absolute top-0 left-0 right-0 flex flex-1 items-center justify-center h-full sm:items-stretch ${
                            user ? 'md:justify-start' : 'sm:justify-center'
                        }`}
                    >
                        <div className="h-full sm:block xl:grow">
                            <div className="flex space-x-4 relative w-full h-full">
                                <div className="xl:top-0 h-full xl:w-full flex xl:absolute top-1 justify-center">
                                    <Link
                                        href="/"
                                        className="w-24 h-full flex center relative text-zero"
                                    >
                                        Header Logo
                                        <Image
                                            src={logo}
                                            alt="posteveryday logo"
                                            className="block w-full h-full"
                                            sizes="(min-width: 0) 108px, 108px"
                                            fill
                                            loading="eager"
                                        />
                                    </Link>
                                </div>

                                {user && (
                                    <div className="hidden md:flex space-x-4">
                                        <HeaderLink href="/">Feed</HeaderLink>
                                        <HeaderLink href="/my-posts">My posts</HeaderLink>
                                        <HeaderLink href="/add-post">Add post</HeaderLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {user ? (
                        <div className="absolute z-20 inset-y-0 right-0 flex items-center pr-2 sm:pr-0">
                            <HeaderProfile user={user} />
                        </div>
                    ) : (
                        <div className="absolute z-20 right-0">
                            <HeaderLink href="/login">Log In</HeaderLink>
                        </div>
                    )}
                </div>
            </div>

            {isMobileMenuIsOpened && user && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <HeaderLink href="/">Feed</HeaderLink>
                        <HeaderLink href="/my-posts">My posts</HeaderLink>
                        <HeaderLink href="/add-post">Add post</HeaderLink>
                    </div>
                </div>
            )}
        </nav>
    );
}
