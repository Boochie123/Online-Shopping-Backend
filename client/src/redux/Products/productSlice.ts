import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../modules/Products/Components/Upload product/Models/IProduct";
import axios from "axios";
interface Product{
    singleProduct:IProduct;
    status:boolean;
    errorMessage:string;
    msg:string;
    allProducts:IProduct[];
}

let data:Product={
    allProducts:[] as IProduct[],
    singleProduct:{} as IProduct,
    status:false,
    errorMessage:'',
    msg:''
    
}

export const getMensCollection=createAsyncThunk('get/menscollection',async ()=>
{
    const response= await axios.get<IProduct[]>('http://127.0.0.1:5000/api/products/mens');
    return response.data;
})

export const getWomensCollection=createAsyncThunk('get/womenscollection',async ()=>
    {
        const response= await axios.get<IProduct[]>('http://127.0.0.1:5000/api/products/womens');
        return response.data;
    })

export const getKidsCollection=createAsyncThunk('get/kidscollection',async ()=>
        {
            const response= await axios.get<IProduct[]>('http://127.0.0.1:5000/api/products/kids');
            return response.data;
        })  

export const uploadProduct=createAsyncThunk('upload/product',async (product:IProduct)=>
{
    const response=await axios.post('http://127.0.0.1:5000/api/products/upload',product);
    return response.data
})

export const getSingleProduct=createAsyncThunk('get/singleproduct',async(productId:string | undefined)=>
{
   const response=await axios.get<IProduct>(`http://127.0.0.1:5000/api/products/${productId}`) 
   return response.data
})

const productSlice=createSlice(
    {
        name:'prod',
        initialState:data,
        reducers:{

        },
        extraReducers(builder) {
            builder.addCase(uploadProduct.pending,(state)=>
            {
                state.status=true;
            })
            .addCase(uploadProduct.fulfilled,(state)=>
            {
                state.status=false;
                state.msg='Product uploaded successfully';
            })
            .addCase(uploadProduct.rejected,(state,action:PayloadAction<any>)=>
            {
                state.status=false;
                state.errorMessage=action.payload as string;
            })
            //get men's collection
            builder.addCase(getMensCollection.pending,(state)=>
                {
                    state.status=true;
                    state.errorMessage='';
                })
                .addCase(getMensCollection.fulfilled,(state,action:PayloadAction<IProduct[]>)=>
                {
                    state.status=false;
                    state.allProducts=action.payload;
                    state.msg='Get mens';
                })
                .addCase(getMensCollection.rejected,(state,action:PayloadAction<any>)=>
                {
                    state.status=false;
                    state.errorMessage=action.payload as string;
                })

                 //get women's collection
            builder.addCase(getWomensCollection.pending,(state)=>
                {
                    state.status=true;
                    state.errorMessage='';
                })
                .addCase(getWomensCollection.fulfilled,(state,action:PayloadAction<IProduct[]>)=>
                {
                    state.status=false;
                    state.allProducts=action.payload;
                    state.msg='Get mens';
                })
                .addCase(getWomensCollection.rejected,(state,action:PayloadAction<any>)=>
                {
                    state.status=false;
                    state.errorMessage=action.payload as string;
                })

                 //get kids collection
            builder.addCase(getKidsCollection.pending,(state)=>
                {
                    state.status=true;
                    state.errorMessage='';
                })
                .addCase(getKidsCollection.fulfilled,(state,action:PayloadAction<IProduct[]>)=>
                {
                    state.status=false;
                    state.allProducts=action.payload;
                    state.msg='Get mens';
                })
                .addCase(getKidsCollection.rejected,(state,action:PayloadAction<any>)=>
                {
                    state.status=false;
                    state.errorMessage=action.payload as string;
                })
                //get single product
                builder.addCase(getSingleProduct.pending,(state)=>
                    {
                        state.status=true;
                        state.errorMessage='';
                    })
                    .addCase(getSingleProduct.fulfilled,(state,action:PayloadAction<IProduct>)=>
                    {
                        state.status=false;
                        state.singleProduct=action.payload;
                        state.msg='Get mens';
                    })
                    .addCase(getSingleProduct.rejected,(state,action:PayloadAction<any>)=>
                    {
                        state.status=false;
                        state.errorMessage=action.payload as string;
                    })
        },
    }
)
export default productSlice.reducer;