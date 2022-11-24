import React from 'react';
import { useRouter } from 'next/router';

function HeaderLink({ href, children }) {
    const regularStyle =
        'relative xs:block transition hover:no-underline text-stone-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium';
    const selectedStyle =
        'relative xs:block hover:no-underline bg-stone-500 text-white px-3 py-2 rounded-md text-sm font-medium';
    const router = useRouter();
    let style = regularStyle;
    if (router.asPath === href) {
        style = selectedStyle;
    }

    return (
        <a href={href} className={style}>
            {children}
        </a>
    );
}

export default HeaderLink;
