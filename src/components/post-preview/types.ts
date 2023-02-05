export interface IPostPreviewProps {
    image: File;
    title: string;
    html: string;
    backCallback: React.Dispatch<React.SetStateAction<boolean>>;
}
