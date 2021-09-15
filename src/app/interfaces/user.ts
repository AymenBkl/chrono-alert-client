import { Url } from "url";
import { Plan } from "../dashboard-client/interfaces";
import { Telegram } from "./telegram";

export interface User {
    _id:string
    firstName: string;
    lastName:string;
    imageURL:string;
    username:string;
    email:string;
    address:string;
    city:string;
    country:string;
    postalCode:string;
    description:string;
    role:string;
    status:string;
    urls:Url[];
    telegram:Telegram[];
    emailVerified:boolean;
    plan:Plan;
    newEmail:{
      email:string;
      emailVerified:boolean;
    }
    createdAt:string;
  }
  