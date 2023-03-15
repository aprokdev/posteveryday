import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
    children: ReactNode;
}

const Portal = ({ children }: IPortalProps) => {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector<HTMLElement>('#portal');
        setMounted(true);
    }, []);

    return ref.current && mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
