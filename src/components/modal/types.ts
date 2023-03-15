export interface IModalProps {
    onClose: () => undefined | void;
    overlayClassName?: string;
    bodyClassName?: string;
    children: React.ReactNode;
}
