import { Plan } from "../dashboard-client/interfaces";

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
    emailVerified:boolean;
    plan:Plan;
    createdAt:string;
  }
  