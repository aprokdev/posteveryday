import { IButtonProps } from './types';

const baseCN = `
    block
    shadow-lg
    duration-200
    cursor-pointer
    text-center
    rounded-md
    bg-black
    border-2
    border-black
    py-3 px-4 
    text-[0.8125rem] 
    font-semibold 
    leading-5 
    text-white
`;

export default function Button(props: IButtonProps): JSX.Element {
    const { type = 'button', className, children, onClick, disabled, ...rest } = props;
    const hoverCN = `${disabled ? ' hover:opacity-50' : ' hover:opacity-80'}`;
    const activeCN = `${disabled ? ' active:opacity-50' : ' active:opacity-80'}`;
    const disabledCN = disabled ? ' opacity-50 cursor-default' : ' cursor-pointer';
    const additionalCN = className ? ` ${className}` : '';
    const cn = `${baseCN}${additionalCN}${disabledCN}${hoverCN}${activeCN}`;
    return (
        <button type={type} className={cn} onClick={onClick} disabled={disabled} {...rest}>
            {children}
        </button>
    );
}
