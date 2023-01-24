type File = {
    lastModified: number;
    name: string;
    webkitRelativePath: string;
    size: number;
    type: string;
};

export interface IFileInput {
    file?: File | {};
    disabled: boolean;
    placeholder: string;
}
