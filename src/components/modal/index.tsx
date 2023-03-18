import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import Portal from '@components/portal';
import { IModalProps } from './types';

function Modal({
    onClose,
    overlayClassName = '',
    bodyClassName = '',
    children,
}: IModalProps): JSX.Element {
    useEffect(() => {
        const documentWidth = document.documentElement.clientWidth;
        const windowWidth = window.innerWidth;
        const scrollBarWidth = windowWidth - documentWidth;

        const headerEl = document.getElementById('#header');

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;

        const compStyles = window.getComputedStyle(headerEl);

        if (compStyles.getPropertyValue('position') === 'fixed') {
            headerEl.style.paddingRight = `${scrollBarWidth}px`;
        }
        return () => {
            document.body.style.overflow = 'visible';
            document.body.style.paddingRight = '0';
            headerEl.style.paddingRight = '0';
        };
    }, []);

    const overlayCN = `bg-neutral-900 opacity-75 fixed top-0 left-0 right-0 bottom-0 ${overlayClassName}`;
    const bodyCN = `bg-white xs:p-8 md:p-12 relative xs:w-80 md:w-96 rounded-md ${bodyClassName}`;

    return (
        <Portal>
            <div className="fixed top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center">
                <div className={overlayCN} onClick={onClose} />
                <div className={bodyCN}>
                    <button type="button" className="absolute top-4 right-4" onClick={onClose}>
                        <XMarkIcon className="block text-stone-800 h-6 w-6" />
                    </button>
                    {children}
                </div>
            </div>
        </Portal>
    );
}

export default Modal;
