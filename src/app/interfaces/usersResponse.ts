import { User } from "./user";

export interface UsersResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    data: User;
}






export interface EmailResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    data: EmailData[];
}

export interface EmailData {
    _id:string;
    user:User;
    total:number;
}

