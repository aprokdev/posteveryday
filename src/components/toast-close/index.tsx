import { XMarkIcon } from '@heroicons/react/24/outline';
import { IToastCloseProps } from './types';

export default function ToastClose({ closeToast }: IToastCloseProps): JSX.Element {
    return (
        <button type="button" className="absolute top-4 right-4" onClick={closeToast}>
            <XMarkIcon className="block text-stone-800 h-6 w-6" />
        </button>
    );
}
