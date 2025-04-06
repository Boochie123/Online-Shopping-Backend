export interface IUser
{
    _id?:string;
    name:string;
    email:string;
    password:string;
    isAdmin:boolean;
    address:IAddress;
    avatar:string;
} 

export interface IAddress
{
    flat:string;
    street:string;
    landmark:string;
    city:string;
    country:string;
    mobile:string;
    state:string;
    pin:string;
}