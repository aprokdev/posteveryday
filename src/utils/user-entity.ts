import { compare, hash } from 'bcryptjs';
import crypto from 'crypto';

export interface IBody {
    email: string;
    first_name: string;
    last_name: string;
}

export interface IUserEntity {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    setPassword: (password: string, salt: number) => Promise<void>;
}

export class UserEntity implements IUserEntity {
    public email: string;
    public first_name: string;
    public last_name: string;
    public password: string;

    constructor({ email, first_name, last_name }: IBody) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
    }

    async setPassword(password: string, salt: number): Promise<void> {
        if (!salt) {
            throw new Error('SALT was not provided');
        }
        this.password = await hash(password, salt);
    }

    static async comparePassword(password: string, passwordHash: string): Promise<boolean> {
        return await compare(password, passwordHash);
    }
}

export function validatePassword(password: string, hash: string, salt: string): boolean {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

export type genPassword = {
    salt: string;
    hash: string;
};

export function genPassword(password: string): genPassword {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, hash };
}
