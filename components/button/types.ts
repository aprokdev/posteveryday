export interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}
