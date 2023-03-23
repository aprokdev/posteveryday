/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { IconCheck } from './icon';
import styles from './style.module.scss';

export type Ref = HTMLInputElement;

const Checkbox = React.forwardRef(function cb<Ref, IInputProps>(
    { id, error, ...rest },
    ref
): JSX.Element {
    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLLabelElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(ref);

            ref.change();
        }
    }, []);

    return (
        <span className={styles.checkbox}>
            <input type="checkbox" className="hidden" ref={ref} id={id} {...rest} />
            <label
                className={`block w-6 h-6 border-2 ${
                    error ? 'border-red' : 'border-gray-400'
                } rounded-md cursor-pointer`}
                htmlFor={id}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                <IconCheck color="#fff" />
            </label>
        </span>
    );
});

export default Checkbox;
