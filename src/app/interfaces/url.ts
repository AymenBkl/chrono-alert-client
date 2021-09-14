import { User } from "./user";


export interface Url {
    _id:string;
    url:string;
    email:string;
    filterData:[{
        id:string;
        type:string;
        name:string;
        imageUrl:string;
    }],
    filterNotifcationData:{
        availabilityArticleFilters:string[],
        sellterTypeFilter:string[],
        shippingFilter:string[],
        trustedMax:number,
        trustedMin:number,
    },
    user:User;
    status:string;
    emailActive:string;
    telegramActive:boolean;
    whatsappActive:boolean;
    applicationActive:boolean;
    createdAt:string;
};

export interface UrlResponse {
    err: any;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    url:Url;
} 

export interface UrlNotificationResponse {
    err: any;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    url:UrlNotification[];
} 

export interface UrlNotification {
    _id:string;
    url:string;
    email:string;
    filterData:[{
        id:string;
        type:string;
        name:string;
        imageUrl:string;
    }],
    filterNotifcationData:{
        availabilityArticleFilters:string[],
        sellterTypeFilter:string[],
        shippingFilter:string[],
        trustedMax:number,
        trustedMin:number,
    },
    user:User;
    status:string;
    emailActive:string;
    telegramActive:boolean;
    whatsappActive:boolean;
    applicationActive:boolean;
    createdAt:string;
    totalemails:[{total:string}];
    totaltelegrams:[{total:string}];
}
