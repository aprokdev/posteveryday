import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '@public/images/logo.svg';
import Skeleton from 'react-loading-skeleton';
import HeaderLink from '../header-link';

function HeaderNav({ user, isUserFetching }) {
    const router = useRouter();

    let justifyWrapClass = 'md:justify-start';
    let growInnerClass = 'sm:grow';
    let imageWrapClass = 'sm:absolute sm:w-full sm:top-0';

    if (!user && router.pathname === '/posts/[id]') {
        justifyWrapClass = 'sm:justify-center';
        growInnerClass = 'xs:grow';
        imageWrapClass = 'xs:absolute xs:w-full xs:top-0 sm:absolute sm:w-full sm:top-0';
    }

    if (user) {
        growInnerClass = 'md:block';
        imageWrapClass = 'md:relative';
    }

    return (
        <div
            className={`absolute top-0 left-0 right-0 flex flex-1 items-center justify-center h-full ${justifyWrapClass}`}
        >
            <div className={`h-full ${growInnerClass} xl:grow`}>
                <div className="flex space-x-4 relative w-full h-full">
                    <div
                        className={`xl:top-0 h-full xl:w-full flex ${imageWrapClass} xl:absolute justify-center`}
                    >
                        <div className="w-24 h-full flex center relative text-zero color-black">
                            {isUserFetching ? (
                                <Skeleton className="h-8 w-24 absolute" style={{ top: '18px' }} />
                            ) : (
                                <Image
                                    src={logo}
                                    alt="posteveryday logo"
                                    className="block w-full h-full"
                                    sizes="(min-width: 0) 108px, 108px"
                                    fill
                                    loading="eager"
                                />
                            )}
                        </div>
                    </div>

                    {user && !isUserFetching && (
                        <div className="hidden md:flex space-x-4">
                            <HeaderLink href="/">Feed</HeaderLink>
                            <HeaderLink href="/my-posts">My posts</HeaderLink>
                            {/* <HeaderLink href="/add-post">Add post</HeaderLink> */}
                            <HeaderLink href="/terms">Terms</HeaderLink>
                        </div>
                    )}
                    {!user && !isUserFetching && router.pathname === '/posts/[id]' && (
                        <div className="xs:flex !ml-0">
                            <HeaderLink href="/">Feed</HeaderLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderNav;
