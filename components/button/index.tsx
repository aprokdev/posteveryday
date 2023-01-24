import { IButtonProps } from './types';

const baseClassName = `
    block
    shadow-lg
    duration-200
    cursor-pointer
    text-center
    rounded-md
    bg-black
    hover:opacity-80 
    active:opacity-100 
    py-3 px-4 
    text-[0.8125rem] 
    font-semibold 
    leading-5 
    text-white
`;

export default function Button(props: IButtonProps): JSX.Element {
    const { type = 'button', className, children, onClick, disabled, ...rest } = props;
    return (
        <button
            type={type}
            className={`${baseClassName}${className ? ` ${className}` : ''}`}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
}
