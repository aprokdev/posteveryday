import React from 'react';

interface IPopupProps {
    children?: React.ReactNode;
}

export type Ref = HTMLDivElement;

const Popup = React.forwardRef<Ref, IPopupProps>((props, ref) => (
    <div
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
        ref={ref}
    >
        {props.children}
    </div>
));

export default Popup;
