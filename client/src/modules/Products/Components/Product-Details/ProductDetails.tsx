import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { dispatchAction, RootState } from "../../../../redux/store";
import { getSingleProduct } from "../../../../redux/Products/productSlice";
import { addToCart } from "../../../../redux/Orders/orderSlice";

interface Istate
{
    qty:string;
}

let ProductDetails:React.FC=()=>
{

let [getQtyState,setQtyState]=useState<Istate>(
{
    qty:''
}
)
const navigate=useNavigate();
const {productId}=useParams<{productId:string}>();
let dispatch=useDispatch<dispatchAction>();
let getData=useSelector((state:RootState)=>
{
    return state.pro.singleProduct;
})



useEffect(()=>
{
    dispatch(getSingleProduct(productId));
},[])

//update the  qty
let updateQty=(event:React.ChangeEvent<HTMLSelectElement>)=>
{
    setQtyState(
        {
            qty:event.target.value
        }
    )
}


//update Cart

let updateCart=async()=>
{
    console.log("Dispatching addToCart with:", getData);
    await dispatch(addToCart(getData));
    navigate('/orders/cart');
}
    return(
        <React.Fragment>
            {/* <pre>{JSON.stringify(getQtyState)}</pre> */}
            <div className="container mx-5 my-5">
                <div className="row">
                    <div className="col-md-5">
                    <img src={getData.image}  width={350} height={450}/>
                    </div>
                    <div className="col-md-7">
                        <p>Name: <b> {getData.name}</b></p>
                        <p>Brand: <b> {getData.brand}</b></p>
                        <p>Price: &#8377; <b> {getData.price}</b></p>
                         <form >
                            <select className="form-control-sm" onChange={updateQty}>
                                <option>Select the qty</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </form>
                        <p className="mt-2 ">Description: <b> {getData.description}</b></p>
                        <p>Usage: <b> {getData.usage}</b></p>
                        <button className="btn btn-outline-dark btn-md" onClick={updateCart}>Add to cart</button>
                    </div>
                </div>
            </div>
           
        </React.Fragment>
    )
}
export default ProductDetails;