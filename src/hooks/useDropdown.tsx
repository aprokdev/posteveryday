import React from 'react';

export function useDropdown() {
    const [isVisible, setVisiability] = React.useState<boolean>(false);
    const openBtnRef = React.useRef<HTMLButtonElement>();
    const popupRef = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        function handleClickOutside({ target }) {
            const isClickOnOpenButton = openBtnRef.current && openBtnRef.current.contains(target);
            const isClickOutsideThePopup = popupRef.current && !popupRef.current.contains(target);
            if (isClickOnOpenButton) return;
            if (isClickOutsideThePopup) {
                setVisiability(false);
            }
        }
        document.documentElement.addEventListener('click', handleClickOutside, false);
        return () => {
            document.documentElement.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    return { openBtnRef, popupRef, isVisible, setVisiability };
}
