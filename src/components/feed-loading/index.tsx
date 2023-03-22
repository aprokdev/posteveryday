import React from 'react';

export default function FeedLoading() {
    const [state, setState] = React.useState(1);

    const ref = React.useRef<any>(null);

    React.useEffect(() => {
        ref.current = setInterval(() => {
            if (state === 3) {
                setState(1);
            } else {
                setState(state + 1);
            }
        }, 200);
        return () => clearInterval(ref.current);
    }, [state]);

    return (
        <div className="text-center py-6" key={0}>
            <div className="flex justify-center">
                Loading
                <span className="relative">
                    <span className="absolute left-0 right-auto">
                        {new Array(state).fill('').map((item, i) => (
                            <span className="mx-1" key={i}>
                                .
                            </span>
                        ))}
                    </span>
                </span>
            </div>
        </div>
    );
}
