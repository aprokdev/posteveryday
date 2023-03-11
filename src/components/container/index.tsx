import { IContainerProps } from './types';

function Container({ children, className }: IContainerProps) {
    const baseCN = 'min-w-375 mx-auto sm:px-6 lg:px-8 xs:px-4 pt-6 pb-10';
    const cn = `${baseCN}${className ? ` ${className}` : ''}`;
    return <main className={cn}>{children}</main>;
}

export default Container;
