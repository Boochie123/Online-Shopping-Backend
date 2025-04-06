
import mongoose from "mongoose";

const productSchema=new mongoose.Schema(
    {
        name:{type:String,require:true},
        brand:{type:String,require:true},
        price:{type:Number,require:true},
        qty:{type:Number,require:true},
        image:{type:String,require:true},
        category:{type:String,require:true},
        description:{type:String,require:true},
        usage:{type:String,require:true},

    },{timestamps:true}
)

export const ProductTable=mongoose.model('Product',productSchema);