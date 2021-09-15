import { User } from "./user";

export interface Telegram {
    first_name:string;
    last_name: string;
    username:string;
    id :string;
    status:string;
    user:User;
}

export interface SocialResponse {
    err: any;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    social: Telegram;
}