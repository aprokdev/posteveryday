import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useDropdown } from '@hooks/useDropdown';
import React from 'react';

export default function HeaderProfile() {
    const { openBtnRef, popupRef, isVisible, setVisiability } = useDropdown();
    return (
        <div className="relative z-20">
            <button
                type="button"
                className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setVisiability(!isVisible)}
                ref={openBtnRef}
            >
                <span className="sr-only">Open user menu</span>
                <span className="block relative h-10 w-10">
                    <UserCircleIcon className="block w-full h-full text-stone-800" />
                    <img
                        className="absolute top-0 right-0 bottom-0 left-0 h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </span>
            </button>
            {isVisible && (
                <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                    ref={popupRef}
                >
                    <Link
                        href="profile"
                        className="hover:text-stone-500 transition block px-4 py-2 text-sm text-stone-700 hover:no-underline"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                    >
                        Your Profile
                    </Link>
                    <Link
                        href="/login"
                        className="hover:text-stone-500 transition block px-4 py-2 text-sm text-stone-700 hover:no-underline"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                    >
                        Sign out
                    </Link>
                </div>
            )}
        </div>
    );
}
