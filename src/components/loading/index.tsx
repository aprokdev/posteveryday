import React from 'react';
import { ILoadingProps } from './types';

export default function Loading(props: ILoadingProps): JSX.Element {
    const { text, className, speed = 200, dotsMargin } = props;

    const [state, setState] = React.useState<number>(0);

    const ref = React.useRef<NodeJS.Timer>(null);

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
