import React from 'react';

function Footer() {
    return (
        <div className="mt-4 overflow-hidden rounded-lg bg-white ring-1 ring-slate-900/5">
            <img
                className="h-auto w-full sm:hidden"
                loading="lazy"
                src="/img/components/footers.01-4-column-with-company-mission-xs.png"
                width="375"
                height="841"
            />
            <img
                className="hidden h-auto w-full sm:block"
                loading="lazy"
                src="/img/components/footers.01-4-column-with-company-mission-xl.png"
                width="1280"
                height="457"
            />
        </div>
    );
}

export default Footer;
