export interface IRegisterFormInputs {
    Email: string;
    'First name': string;
    'Last name': string;
    Password: string;
    Terms: boolean;
}

export type Key = 'Email' | 'First name' | 'Last name' | 'Password' | 'Terms';
