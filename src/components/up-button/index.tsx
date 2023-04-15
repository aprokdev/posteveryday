import Image from 'next/image';
import ArrowUp from '@public/images/arrow-up.svg';
import React from 'react';

export default function UpButton(): JSX.Element {
    const onClick = () => {
        document.documentElement.scrollTo(0, 0);
    };

    const [isVisible, setVisible] = React.useState<boolean>(false);

    React.useEffect(() => {
        function handleScroll({ target }) {
            const pageScroll = target.documentElement.scrollTop;
            if (pageScroll > 800) {
                setVisible(true);
            }
            if (pageScroll < 800) {
                setVisible(false);
            }
        }
        window.addEventListener('scroll', handleScroll, false);
        return () => {
            window.removeEventListener('scroll', handleScroll, false);
            document.documentElement.classList.remove('pt-16');
        };
    }, []);

    return isVisible ? (
        <button
            type="button"
            onClick={onClick}
            className="fixed right-9 bottom-9 w-10 h-10 border-2 hover:opacity-100 bg-gray-200 rounded-3xl"
        >
            <Image src={ArrowUp} loading="eager" alt="" fill className="scale-125" />
        </button>
    ) : null;
}
