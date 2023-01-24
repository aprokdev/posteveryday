import React from 'react';
import { ITextareaProps } from './types';

export type Ref = HTMLDivElement;

const baseClassName = `
    py-2
    px-3
    mt-1
    block
    w-full
    rounded-md
    bg-gray-100
    border-transparent
    focus:border-gray-500 focus:bg-white focus:ring-0s
`;

export default React.forwardRef<Ref, ITextareaProps>(function Textarea<Ref, ITextareaProps>(
    { type = 'text', value, onChange, placeholder, disabled, className, ...rest },
    ref
) {
    return (
        <textarea
            className={`${baseClassName}${className ? ` ${className}` : ''}`}
            value={value}
            onChange={onChange}
            ref={ref}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
        ></textarea>
    );
});
