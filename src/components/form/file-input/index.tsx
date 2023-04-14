import React from 'react';
import { IFileInput } from './types';

const baseClassName = `
    block
    duration-200
    cursor-pointer
    text-center
    rounded-md
    border-2
    border-zinc-400
    uppercase 
    hover:opacity-80 
    active:opacity-100 
    py-3 px-4 
    mt-1
    text-[0.8125rem] 
    font-semibold 
    leading-5
    text-zinc-500
`;

export default React.forwardRef<HTMLDivElement, IFileInput>(function FileInput<Ref, IFileInput>(
    props,
    ref
): JSX.Element {
    const { file, placeholder } = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files?.length) {
            props.onChange && props.onChange(e);
        } else {
            e.target.files = null;
            props.onChange && props.onChange(e);
        }
    };
    return (
        <div className="file-uploader">
            <label
                htmlFor={`#fileupload${placeholder}`}
                className={`${baseClassName} ${file && file[0] ? '!border-black !text-black' : ''}`}
            >
                {file && file[0] ? `Attached: ${file[0].name}` : placeholder}
            </label>
            <input
                type="file"
                {...props}
                onChange={onChangeHandler}
                ref={ref}
                id={`#fileupload${placeholder}`}
                className="hidden"
            />
        </div>
    );
});
