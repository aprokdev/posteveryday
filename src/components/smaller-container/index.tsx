import { ISmallerContainerProps } from './types';

export default function SmallerContainer(props: ISmallerContainerProps): JSX.Element {
    const { children, className } = props;
    const baseCN = 'min-w-375 max-w-5xl m-auto sm:px-6 lg:px-8 xs:px-4';
    const cn = `${baseCN}${className ? ` ${className}` : ''}`;
    return <div className={cn}>{children}</div>;
}
