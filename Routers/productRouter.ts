import express from "express";
import { ProductTable } from "../Models/Product";
import { IProduct } from "../Models/IProduct";

const productRouter:express.Router=express.Router();

/*
Upload a product
URL:http://127.0.0.1:5000/api/products/upload
Method:Post
Fields:name,brand,price,qty,category,description,usage
*/
productRouter.post('/upload',async (request:express.Request,response:express.Response)=>
{
    try
    {
        let {name,brand,price,qty,image,category,description,usage}=request.body;
        let product=await new ProductTable({name,brand,price,qty,image,category,description,usage})
        await product.save()
        response.status(200).json({msg:'product created successfully',product})
    }
    catch(error)
    {

    }
})
/*
Get a Mens wear product
URL:http://127.0.0.1:5000/api/products/mens
Method:Get
Fields:no-fidlds
*/

productRouter.get('/mens',async (request:express.Request,response:express.Response)=>
{
   try{
    let product:IProduct[] | null = await ProductTable.find({category:"Mens"});
    response.status(200).json(product);
   }
   catch(error)
   {
    response.status(401).json({error:error});
   } 
});

/*
Get a Womens wear product
URL:http://127.0.0.1:5000/api/products/womens
Method:Get
Fields:no-fidlds
*/

productRouter.get('/womens',async (request:express.Request,response:express.Response)=>
    {
       try{
        let product:IProduct[] | null = await ProductTable.find({category:"Womens"});
        response.status(200).json(product);
       }
       catch(error)
       {
        response.status(401).json({error:error});
       } 
    });

    /*
Get a Kids wear product
URL:http://127.0.0.1:5000/api/products/kids
Method:Get
Fields:no-fidlds
*/

productRouter.get('/kids',async (request:express.Request,response:express.Response)=>
    {
       try{
        let product:IProduct[] | null = await ProductTable.find({category:"Kids"});
        response.status(200).json(product);
       }
       catch(error)
       {
        response.status(401).json({error:error});
       } 
    });

 /*   Get a product by using Id
URL:http://127.0.0.1:5000/api/products/:productId
Method:get
Fields:No-fields
*/

productRouter.get('/:productId',async(request:express.Request,response:express.Response)=>
{
    try{
        let productid=request.params.productId;
        // console.log(productid);
        let product =await ProductTable.findById(productid);
        response.status(200).json(product)
    }
    catch(error)
    {
        response.status(401).json({error:error});
    }
})


export default productRouter;