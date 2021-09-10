import { User } from "./user";

export interface UsersResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    data: User;
}



export interface TelegramResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    data: TelegramData[];
}

export interface Telegram {
    _id : string;
    createdAt:string;
    first_name:string;
    last_name:string;
    username:string;
    id:string;
}


export interface TelegramData {
    _id : Telegram;
    user:User;
    total:number;
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

export interface UrlResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    data: UrlData[];
}

export interface UrlData {
    _id:string;
    url:String;
    totalemails:{
        total:number
    };
    totaltelegrams:{
        total:number
    };
}