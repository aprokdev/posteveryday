export interface IFormFields {
    image: File;
    title: string;
    html: string;
}

export interface IPostFormProps {
    title: string;
    html: string;
    onSubmit: (IFormFields) => void;
    children?: React.ReactNode;
    imageValidation?: boolean;
}

export interface IFormInputs {
    Title: string;
    Image: File;
    Body: string;
}
