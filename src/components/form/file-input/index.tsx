import React from 'react';
import { IFileInput } from './types';

export type Ref = HTMLDivElement;

const baseClassName = `
    block
    duration-200
    cursor-pointer
    text-center
    rounded-md
    border-2
    border-black
    uppercase 
    hover:opacity-80 
    active:opacity-100 
    py-3 px-4 
    mt-1
    text-[0.8125rem] 
    font-semibold 
    leading-5 
    text-black
`;

export default React.forwardRef<Ref, IFileInput>(function FileInput<Ref, IFileInput>(props, ref) {
    const { file, placeholder } = props;
    const onChangeHandler = (e) => {
        console.log(e.target.files.length);
        if (e.target.files.length) {
            props.onChange && props.onChange(e);
        } else {
            e.target.files = null;
            props.onChange && props.onChange(e);
        }
    };
    return (
        <div className="file-uploader">
            <label htmlFor="#fileupload" className={baseClassName}>
                {file && file[0] ? `Attached: ${file[0].name}` : placeholder}
            </label>
            <input
                type="file"
                {...props}
                onChange={onChangeHandler}
                ref={ref}
                id="#fileupload"
                className="hidden"
            />
        </div>
    );
});
