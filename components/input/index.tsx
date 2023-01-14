import React from 'react';

export type Ref = HTMLDivElement;

interface IInputProps {
    type?: string;
    value?: string;
    onChange?: (e: React.SyntheticEvent<EventTarget>) => void;
    placeholder?: string;
}

export default React.forwardRef<Ref, IInputProps>(function Input<Ref, IInputProps>(
    { type = 'text', value, onChange, placeholder, ...rest },
    ref
) {
    return (
        <input
            type={type}
            className="
                py-2
                px-3
                mt-1
                block
                w-full
                rounded-md
                bg-gray-100
                border-transparent
                focus:border-gray-500 focus:bg-white focus:ring-0s
            "
            value={value}
            onChange={onChange}
            ref={ref}
            placeholder={placeholder}
            {...rest}
        />
    );
});
