export interface IFormFields {
    image: File;
    title: string;
    html: string;
}

export interface IPostFormProps {
    image: File;
    title: string;
    html: string;
    onSubmit: (IFormFields) => void;
    children?: React.ReactNode;
    imageValidation?: boolean;
}

export interface IFormInputs {
    Title: string;
    Image: object;
    Body: string;
}
