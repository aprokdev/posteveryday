import React from 'react';

export type Ref = HTMLDivElement;

interface IInputProps {
    value?: string;
    onChange: Function;
}

export default React.forwardRef<Ref, IInputProps>(function Input<Ref, IInputProps>(props, ref) {
    return (
        <input
            className="block relative z-100 mt-20"
            value={props.value}
            onChange={props.onChange}
            ref={ref}
        />
    );
});
