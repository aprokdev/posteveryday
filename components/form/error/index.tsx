import React from 'react';
import { IFormErrorProps } from './types';

function FormError({ children }: IFormErrorProps): JSX.Element {
    return (
        <span className={`text-sm ${children ? 'text-red' : 'text-transparent'}`}>
            {children || 0}
        </span>
    );
}

export default FormError;
