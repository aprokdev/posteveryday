import React from 'react';
import { ILoadingProps } from './types';

export default function Loading({
    text,
    className,
    speed = 200,
    dotsMargin,
}: ILoadingProps): JSX.Element {
    const [state, setState] = React.useState(0);

    const ref = React.useRef<any>(null);

    React.useEffect(() => {
        ref.current = setInterval(() => {
            if (state === 3) {
                setState(1);
            } else {
                setState(state + 1);
            }
        }, speed);
        return () => clearInterval(ref.current);
    }, [state]);

    return (
        <div className={`flex justify-center${className ? ` ${className}` : ''}`}>
            {text}
            <span className="relative">
                <span className="absolute left-0 right-auto">
                    {new Array(state).fill('').map((item, i) => (
                        <span className={`mx-${dotsMargin}`} key={i}>
                            .
                        </span>
                    ))}
                </span>
            </span>
        </div>
    );
}
