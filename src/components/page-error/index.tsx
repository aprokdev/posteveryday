import { IPageErrorProps } from './types';

export default function PageError({ message }: IPageErrorProps): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-mainMin xs:pb-20 sm:pb-0">
            <h1 className="block mb-5 text-center w-full xs:text-2xl md:text-4xl">
                Error: {message}
            </h1>
        </div>
    );
}
