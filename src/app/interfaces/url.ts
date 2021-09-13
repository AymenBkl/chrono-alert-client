import { User } from "./user";


export interface Url {
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
}
