import React from 'react';
import HeaderLink from './header-link';
// import Popup from '../popup';
import { useDropdown } from '../../hooks/useDropdown';

function Header() {
    const [isUserMenuOpened, setUserMenuIsOpened] = React.useState(false);
    const [isMobileMenuIsOpened, setMobileMenuIsOpened] = React.useState(false);

    const { openBtnRef, popupRef, isVisible, setVisiability } = useDropdown();
    return (
        <nav className="bg-stone-400">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-stone-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setMobileMenuIsOpened(!isMobileMenuIsOpened)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block">
                            <div className="flex space-x-4">
                                <HeaderLink href="/feed">Feed</HeaderLink>

                                <HeaderLink href="/my-posts">My posts</HeaderLink>

                                <HeaderLink href="/add-post">Add post</HeaderLink>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* <button
                            type="button"
                            className="rounded-full bg-stone-500 p-1 text-stone-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800"
                        >
                            <span className="sr-only">View notifications</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="white"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                />
                            </svg>
                        </button> */}

                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className="flex rounded-full bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    onClick={() => setVisiability(!isVisible)}
                                    ref={openBtnRef}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </button>
                            </div>

                            {isVisible && (
                                // <Popup ref={popupRef}>
                                <div
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex={-1}
                                    ref={popupRef}
                                >
                                    <a
                                        href="profile"
                                        className="block px-4 py-2 text-sm text-stone-700"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-stone-700"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-1"
                                    >
                                        Settings
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-stone-700"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-2"
                                    >
                                        Sign out
                                    </a>
                                </div>
                                // </Popup>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuIsOpened && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <HeaderLink href="/feed">Feed</HeaderLink>

                        <HeaderLink href="/my-posts">My posts</HeaderLink>

                        <HeaderLink href="/add-post">Add post</HeaderLink>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;
