import Link from 'next/link';
import { useDropdown } from '@frontend/hooks/useDropdown';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function HeaderProfile({ user }): JSX.Element {
    const { openBtnRef, popupRef, isVisible, setVisiability } = useDropdown();
    return (
        <div className="relative z-20 skrink-0">
            <button
                type="button"
                className="flex rounded-full text-sm "
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setVisiability(!isVisible)}
                ref={openBtnRef}
            >
                <span className="sr-only">Open user menu</span>

                <span className="flex items-center relative ">
                    <span className="font-medium mr-3 xs:hidden sm:block">
                        {user.first_name} {user.last_name.slice(0, 1)}.
                    </span>
                    <div>
                        <UserCircleIcon className="block text-stone-800 h-10 w-10" />
                        {/* {userPic && (
                            <img
                                className="absolute top-0 right-0 bottom-0 left-0 h-10 w-10 rounded-full"
                                src={userPic}
                                alt=""
                            />
                        )} */}
                    </div>
                </span>
            </button>

            {isVisible && (
                <div
                    className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                    ref={popupRef}
                >
                    <span
                        // href="/profile"
                        className="block opacity-50 cursor-default transition px-4 py-2 text-sm text-stone-700 hover:no-underline"
                        role="menuitem"
                        id="user-menu-item-0"
                    >
                        My profile (in development)
                    </span>
                    <Link
                        href="/api/users/logout"
                        className="hover:text-stone-500 transition block px-4 py-2 text-sm text-stone-700 hover:no-underline"
                        role="menuitem"
                        // tabIndex={-1}
                        id="user-menu-item-2"
                    >
                        Log out
                    </Link>
                </div>
            )}
        </div>
    );
}
