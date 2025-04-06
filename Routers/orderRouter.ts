import express from "express";
import verifyToken from "../Middleware/TokenVerify";
import { UserTable } from "../Models/User";
import { IUser } from "../Models/IUser";
import { IOrder } from "../Models/IOrder";
import { OrderTable } from "../Models/Order";

const orderRouter:express.Router=express.Router();

/*
To place an order

REST API CONFIGURATION
url:http://127.0.0.1:5000/api/orders/place
method:post
fields:tax,total,items
*/

orderRouter.post('/place',verifyToken,async(request:express.Request,response:express.Response):Promise<void>=>
{
    try{
        let user : IUser | null =await UserTable.findById(response.locals.jwt);
        if(!user)
        {
             response.status(401).json({msg:'user not found'});
             return;
        }
        let {tax,total,items}=request.body;
        let order:IOrder=new OrderTable({
            name:user.name,
            email:user.email,
            mobile:user.address.mobile,
            tax:tax,
            total:total,
            items:items
        })
        await order.save()
        response.status(200).json({order})
    }
    catch(error)
    {
        response.status(401).json({error:error});
    }
})

/*
Get all orders

REST API CONFIGURATION
url:http://127.0.0.1:5000/api/orders
method:get
fields:no-fields
*/

orderRouter.get('/',verifyToken,async (request:express.Request,response:express.Response)=>
{
    try{
        let user : IUser | null =await UserTable.findById(response.locals.jwt);
        if(!user)
        {
             response.status(401).json({msg:'user not found'});
             return;
        }
        let orders:IOrder[]=await OrderTable.find({email:user.email});
        response.status(200).json(orders)
    }
    catch(error)
    {
        response.status(401).json({error:error});
    }
})

export default orderRouter;