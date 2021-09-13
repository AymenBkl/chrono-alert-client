import { User } from "./user";

export interface Telegram {
    first_name:string;
    last_name: string;
    username:string;
    id :string;
    user:User;
}