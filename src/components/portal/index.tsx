import React from 'react';
import { createPortal } from 'react-dom';
import { IPortalProps } from './types';

export default function Portal({ children }: IPortalProps): JSX.Element {
    const ref = React.useRef<Element | null>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        ref.current = document.querySelector<HTMLElement>('#portal');
        setMounted(true);
    }, []);

    return ref.current && mounted ? createPortal(children, ref.current) : null;
}
