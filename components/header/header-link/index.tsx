import React from 'react';
import { useRouter } from 'next/router';

function HeaderLink({ href, children }) {
    const regularStyle =
        'relative xs:block transition hover:no-underline text-stone-900 hover:text-stone-500 px-3 py-2 rounded-md text-sm font-medium';
    const selectedStyle =
        'underline underline-offset-8 decoration-2 hover:decoration-2 relative xs:block transition text-stone-900 px-3 py-2 rounded-md text-sm font-medium';
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
