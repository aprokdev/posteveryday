export interface IInputProps {
    type?: string;
    value?: string;
    onChange?: (e: React.SyntheticEvent<EventTarget>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}
