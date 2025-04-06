import mongoose from "mongoose";
import { IOrder } from "./IOrder";

const orderSchema=new mongoose.Schema<IOrder>(
    {
        name:{type:String,require:true},
        email:{type:String,require:true},
        mobile:{type:Number,require:true},
        tax:{type:String,require:true},
        total:{type:String,require:true},
        items:[
            {
                name:{type:String,require:true},
                brand:{type:String,require:true},
                price:{type:Number,require:true},
                qty:{type:Number,require:true},
            }
            
        ]
        
    },{timestamps:true}
)

export const OrderTable=mongoose.model<IOrder>('Order',orderSchema);