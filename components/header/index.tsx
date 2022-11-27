import React from 'react';
import HeaderLink from './header-link';
// import Popup from '../popup';
import { useDropdown } from '../../hooks/useDropdown';

function Header() {
    const [isMobileMenuIsOpened, setMobileMenuIsOpened] = React.useState(false);
    const { openBtnRef, popupRef, isVisible, setVisiability } = useDropdown();

    const headerRef = React.useRef<HTMLElement>();

    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        function handleScroll({ target }) {
            const pageScroll = target.documentElement.scrollTop;
            if (pageScroll > 400) {
                headerRef.current.classList.add('fixed');
                document.documentElement.classList.add('pt-16');
                setVisible(true);
            }
            if (pageScroll === 0) {
                headerRef.current.classList.remove('fixed');
                document.documentElement.classList.remove('pt-16');
                setVisible(false);
            }
        }
        window.addEventListener('scroll', handleScroll, false);
        return () => {
            window.removeEventListener('scroll', handleScroll, false);
        };
    }, [setVisible]);

    const style = {
        top: visible ? '0' : '-72px',
        transitionDuration: '500ms',
        transitionProperty: 'top',
        // borderBottom: '1px solid rgba(0,0,0,0.1)'
    };

    return (
        <nav
            className="w-screen min-w-375 bg-stone-100 z-20 shadow-xl transition ease-in"
            style={style}
            ref={headerRef}
        >
            <div className="relative mx-auto px-2 sm:px-6 lg:px-8">
                <div className="w-screen right-0 left-0 h-full flex absolute justify-center sm:hidden z-10">
                    <a href="/" className="w-24 flex items-stretch">
                        <svg
                            viewBox="0 0 330.49641693811066 95.21436007369684"
                            preserveAspectRatio="xMidYMid meet"
                            className="w-full block grow"
                            id="edfbfaee"
                        >
                            <defs id="SvgjsDefs1633"></defs>
                            <g
                                id="SvgjsG1634"
                                transform="matrix(4.97436, 0, 0, 4.97436, -2.98462, -3.2728)"
                                fill="#000"
                            >
                                <path d="M5.4 3.6400000000000006 l0 2.8 q0 1.04 -0.16 1.72 t-0.51 1.31 t-1.15 1.75 q-0.82 1.12 -1.07 1.7 t-0.25 1.5 l0 5.58 l-1.66 0 l0 -18.68 l2.56 0 q2.24 0 2.24 2.32 z M2.26 2.9800000000000004 l0 7.2 q0.18 -0.24 0.2 -0.26 q0.8 -1.1 1.04 -1.7 t0.24 -1.56 l0 -2.82 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 l-0.74 0 z M11.379999999999999 3.3599999999999994 l0 14.34 q0 2.3 -2.24 2.3 l0.88 0 l-1.18 0 q-1.2 0 -1.72 -0.61 t-0.52 -1.69 l0 -14.34 q0 -1.1 0.52 -1.7 t1.72 -0.6 l0.98 0 l-0.68 0 q2.24 0 2.24 2.3 z M9.72 3.5799999999999983 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 t-0.57 0.23 t-0.15 0.63 l0 13.9 q0 0.4 0.15 0.63 t0.57 0.23 t0.58 -0.23 t0.16 -0.63 l0 -13.9 z M14.48 8.22 q0.24 0.6 1.04 1.7 q0.8 1.12 1.16 1.74 t0.52 1.29 t0.16 1.71 l0 3.04 q0 2.3 -2.24 2.3 l-0.3 0 q-1.2 0 -1.72 -0.61 t-0.52 -1.69 l0 -4.66 l1.66 0 l0 4.44 q0 0.4 0.15 0.63 t0.57 0.23 t0.58 -0.23 t0.16 -0.63 l0 -3.06 q0 -0.92 -0.25 -1.5 t-1.05 -1.7 q-0.8 -1.1 -1.16 -1.74 t-0.51 -1.32 t-0.15 -1.72 l0 -3.08 q0 -1.1 0.52 -1.7 t1.72 -0.6 l0.3 0 q2.24 0 2.24 2.3 l0 4.7 l-1.66 0 l0 -4.48 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 t-0.57 0.23 t-0.15 0.63 l0 3.08 q0 0.96 0.24 1.56 z M23.34 2.9800000000000004 l-1.56 0 l0 17.02 l-1.66 0 l0 -17.02 l-1.56 0 l0 -1.66 l4.78 0 l0 1.66 z M26.200000000000003 3 l0 6.82 l1.48 0 l0 1.68 l-1.48 0 l0 6.82 l1.48 0 l0 1.68 l-3.14 0 l0 -18.68 l3.14 0 l0 1.68 l-1.48 0 z M30.54 1.3200000000000003 l0.72 11.94 l0.74 -11.94 l1.66 0 l-1.6 18.68 l-1.66 0 l-1.52 -18.68 l1.66 0 z M36.52 3 l0 6.82 l1.48 0 l0 1.68 l-1.48 0 l0 6.82 l1.48 0 l0 1.68 l-3.14 0 l0 -18.68 l3.14 0 l0 1.68 l-1.48 0 z M43.98000000000001 20 l-1.64 0 l-0.02 -5.72 q0 -0.72 -0.14 -1.21 t-0.54 -1.09 q-0.46 0.7 -0.62 1.22 t-0.16 1.34 l0 5.46 l-1.66 0 l0 -18.68 l2.54 0 q2.24 0 2.24 2.32 l0 2.88 q0 1.32 -0.26 2.1 t-1.04 1.9 q0.76 1.08 1.03 1.85 t0.27 2.03 l0 5.6 z M42.32000000000001 3.84 q0 -0.4 -0.15 -0.63 t-0.57 -0.23 l-0.74 0 l0 7.2 q0.06 -0.06 0.09 -0.12 t0.07 -0.1 q0.8 -1.1 1.05 -1.69 t0.25 -1.51 l0 -2.92 z M49.90000000000001 1.3200000000000003 l0 18.68 l-1.66 0 l0 -5.6 q0 -0.88 -0.25 -1.47 t-1.05 -1.69 t-1.16 -1.74 t-0.51 -1.32 t-0.15 -1.72 l0 -5.14 l1.66 0 l0 5.34 q0 0.96 0.24 1.57 t1.04 1.71 l0.18 0.26 l0 -8.88 l1.66 0 z M55.88000000000002 17.7 q0 2.3 -2.24 2.3 l-2.54 0 l0 -18.68 l2.54 0 q2.24 0 2.24 2.32 l0 14.06 z M54.22000000000001 3.84 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 l-0.72 0 l0 15.36 l0.72 0 q0.42 0 0.58 -0.23 t0.16 -0.63 l0 -13.64 z M57.00000000000002 20 l0.98 -18.68 l2.82 0 l0.98 18.68 l-1.54 0 l-0.2 -3.9 l-0.28 0.4 q-0.52 0.72 -0.76 1.16 t-0.32 0.85 t-0.12 1.11 l-0.02 0.38 l-1.54 0 z M59.640000000000015 13.52 q0.18 -0.5 0.18 -1.42 l-0.44 -8.28 l-0.58 11.14 q0.66 -0.94 0.84 -1.44 z M67.04000000000002 1.3200000000000003 l0 18.68 l-1.66 0 l0 -5.6 q0 -0.88 -0.25 -1.47 t-1.05 -1.69 t-1.16 -1.74 t-0.51 -1.32 t-0.15 -1.72 l0 -5.14 l1.66 0 l0 5.34 q0 0.96 0.24 1.57 t1.04 1.71 l0.18 0.26 l0 -8.88 l1.66 0 z"></path>
                            </g>
                        </svg>
                    </a>
                </div>
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden z-20">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white focus:outline-none"
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
                                stroke="#000"
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
                                stroke="#000"
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
                        <div className="hidden sm:block xl:grow">
                            <div className="flex space-x-4 relative w-full">
                                <div className="xl:w-full flex xl:absolute top-1 justify-center">
                                    <a href="/" className="w-24 flex center">
                                        <svg
                                            viewBox="0 0 330.49641693811066 95.21436007369684"
                                            preserveAspectRatio="xMidYMid meet"
                                            className="w-full block grow"
                                            id="edfbfaee"
                                        >
                                            <defs id="SvgjsDefs1633"></defs>
                                            <g
                                                id="SvgjsG1634"
                                                transform="matrix(4.97436, 0, 0, 4.97436, -2.98462, -3.2728)"
                                                fill="#111"
                                            >
                                                <path d="M5.4 3.6400000000000006 l0 2.8 q0 1.04 -0.16 1.72 t-0.51 1.31 t-1.15 1.75 q-0.82 1.12 -1.07 1.7 t-0.25 1.5 l0 5.58 l-1.66 0 l0 -18.68 l2.56 0 q2.24 0 2.24 2.32 z M2.26 2.9800000000000004 l0 7.2 q0.18 -0.24 0.2 -0.26 q0.8 -1.1 1.04 -1.7 t0.24 -1.56 l0 -2.82 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 l-0.74 0 z M11.379999999999999 3.3599999999999994 l0 14.34 q0 2.3 -2.24 2.3 l0.88 0 l-1.18 0 q-1.2 0 -1.72 -0.61 t-0.52 -1.69 l0 -14.34 q0 -1.1 0.52 -1.7 t1.72 -0.6 l0.98 0 l-0.68 0 q2.24 0 2.24 2.3 z M9.72 3.5799999999999983 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 t-0.57 0.23 t-0.15 0.63 l0 13.9 q0 0.4 0.15 0.63 t0.57 0.23 t0.58 -0.23 t0.16 -0.63 l0 -13.9 z M14.48 8.22 q0.24 0.6 1.04 1.7 q0.8 1.12 1.16 1.74 t0.52 1.29 t0.16 1.71 l0 3.04 q0 2.3 -2.24 2.3 l-0.3 0 q-1.2 0 -1.72 -0.61 t-0.52 -1.69 l0 -4.66 l1.66 0 l0 4.44 q0 0.4 0.15 0.63 t0.57 0.23 t0.58 -0.23 t0.16 -0.63 l0 -3.06 q0 -0.92 -0.25 -1.5 t-1.05 -1.7 q-0.8 -1.1 -1.16 -1.74 t-0.51 -1.32 t-0.15 -1.72 l0 -3.08 q0 -1.1 0.52 -1.7 t1.72 -0.6 l0.3 0 q2.24 0 2.24 2.3 l0 4.7 l-1.66 0 l0 -4.48 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 t-0.57 0.23 t-0.15 0.63 l0 3.08 q0 0.96 0.24 1.56 z M23.34 2.9800000000000004 l-1.56 0 l0 17.02 l-1.66 0 l0 -17.02 l-1.56 0 l0 -1.66 l4.78 0 l0 1.66 z M26.200000000000003 3 l0 6.82 l1.48 0 l0 1.68 l-1.48 0 l0 6.82 l1.48 0 l0 1.68 l-3.14 0 l0 -18.68 l3.14 0 l0 1.68 l-1.48 0 z M30.54 1.3200000000000003 l0.72 11.94 l0.74 -11.94 l1.66 0 l-1.6 18.68 l-1.66 0 l-1.52 -18.68 l1.66 0 z M36.52 3 l0 6.82 l1.48 0 l0 1.68 l-1.48 0 l0 6.82 l1.48 0 l0 1.68 l-3.14 0 l0 -18.68 l3.14 0 l0 1.68 l-1.48 0 z M43.98000000000001 20 l-1.64 0 l-0.02 -5.72 q0 -0.72 -0.14 -1.21 t-0.54 -1.09 q-0.46 0.7 -0.62 1.22 t-0.16 1.34 l0 5.46 l-1.66 0 l0 -18.68 l2.54 0 q2.24 0 2.24 2.32 l0 2.88 q0 1.32 -0.26 2.1 t-1.04 1.9 q0.76 1.08 1.03 1.85 t0.27 2.03 l0 5.6 z M42.32000000000001 3.84 q0 -0.4 -0.15 -0.63 t-0.57 -0.23 l-0.74 0 l0 7.2 q0.06 -0.06 0.09 -0.12 t0.07 -0.1 q0.8 -1.1 1.05 -1.69 t0.25 -1.51 l0 -2.92 z M49.90000000000001 1.3200000000000003 l0 18.68 l-1.66 0 l0 -5.6 q0 -0.88 -0.25 -1.47 t-1.05 -1.69 t-1.16 -1.74 t-0.51 -1.32 t-0.15 -1.72 l0 -5.14 l1.66 0 l0 5.34 q0 0.96 0.24 1.57 t1.04 1.71 l0.18 0.26 l0 -8.88 l1.66 0 z M55.88000000000002 17.7 q0 2.3 -2.24 2.3 l-2.54 0 l0 -18.68 l2.54 0 q2.24 0 2.24 2.32 l0 14.06 z M54.22000000000001 3.84 q0 -0.4 -0.16 -0.63 t-0.58 -0.23 l-0.72 0 l0 15.36 l0.72 0 q0.42 0 0.58 -0.23 t0.16 -0.63 l0 -13.64 z M57.00000000000002 20 l0.98 -18.68 l2.82 0 l0.98 18.68 l-1.54 0 l-0.2 -3.9 l-0.28 0.4 q-0.52 0.72 -0.76 1.16 t-0.32 0.85 t-0.12 1.11 l-0.02 0.38 l-1.54 0 z M59.640000000000015 13.52 q0.18 -0.5 0.18 -1.42 l-0.44 -8.28 l-0.58 11.14 q0.66 -0.94 0.84 -1.44 z M67.04000000000002 1.3200000000000003 l0 18.68 l-1.66 0 l0 -5.6 q0 -0.88 -0.25 -1.47 t-1.05 -1.69 t-1.16 -1.74 t-0.51 -1.32 t-0.15 -1.72 l0 -5.14 l1.66 0 l0 5.34 q0 0.96 0.24 1.57 t1.04 1.71 l0.18 0.26 l0 -8.88 l1.66 0 z"></path>
                                            </g>
                                        </svg>
                                    </a>
                                </div>

                                <HeaderLink href="/feed">Feed</HeaderLink>

                                <HeaderLink href="/my-posts">My posts</HeaderLink>

                                <HeaderLink href="/add-post">Add post</HeaderLink>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                        <div className="relative z-20">
                            <div>
                                <button
                                    type="button"
                                    className="flex rounded-full bg-stone-800 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
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
                                        className="hover:text-stone-500 transition block px-4 py-2 text-sm text-stone-700 hover:no-underline"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="hover:text-stone-500 transition block px-4 py-2 text-sm text-stone-700 hover:no-underline"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-2"
                                    >
                                        Sign out
                                    </a>
                                </div>
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
