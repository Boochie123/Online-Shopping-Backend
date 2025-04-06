

export interface IOrder 
{
    save(): IOrder | PromiseLike<IOrder>;
    _id?:string ;
    name:string;
    email:string;
    mobile:number;
    tax:string;
    total:string;
    items:Iitem[]
}

export interface Iitem{
    _id?:string ;
    name:string;
    brand:string;
    price:string;
    qty:string;
}