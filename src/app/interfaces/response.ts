import { User } from "./user";

export interface AuthResponse {
    err: any;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    user: User;
}
