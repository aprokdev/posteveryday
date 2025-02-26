import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import HeaderLink from './header-link';
import HeaderNav from './header-nav';
import HeaderProfile from './header-profile';
import { IHeaderProps } from './types';

export default function Header({ user, isUserFetching }: IHeaderProps): JSX.Element {
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
                    {user && !isUserFetching && (
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

                    <HeaderNav user={user} isUserFetching={isUserFetching} />

                    {user && !isUserFetching && (
                        <div className="absolute z-20 inset-y-0 right-0 flex items-center pr-2 sm:pr-0">
                            <HeaderProfile user={user} />
                        </div>
                    )}
                    {!user && !isUserFetching && (
                        <div className="absolute z-20 right-0">
                            <HeaderLink href="/login">Log In</HeaderLink>
                        </div>
                    )}
                </div>
            </div>

            {isMobileMenuIsOpened && user && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <HeaderLink href="/">Feed</HeaderLink>
                        <HeaderLink href="/my-posts">My posts</HeaderLink>
                        {/* <HeaderLink href="/add-post">Add post</HeaderLink> */}
                    </div>
                </div>
            )}
        </nav>
    );
}
