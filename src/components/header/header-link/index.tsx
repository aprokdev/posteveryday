import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface IHeaderLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function HeaderLink({ href, children, className }: IHeaderLinkProps) {
    const regularStyle =
        'relative xs:flex items-center transition hover:no-underline text-stone-900 hover:text-stone-500 px-3 py-2 rounded-md text-sm font-medium';
    const selectedStyle =
        'xs:flex items-center underline underline-offset-8 decoration-2 hover:decoration-2 relative transition text-stone-900 px-3 py-2 rounded-md text-sm font-medium';
    const router = useRouter();
    let style = regularStyle;
    if (router.asPath === href) {
        style = selectedStyle;
    }

    return (
        <Link href={href} className={`${style} ${className}`}>
            {children}
        </Link>
    );
}
