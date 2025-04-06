import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchAction, RootState } from "../../../../redux/store";
import { getMensCollection } from "../../../../redux/Products/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "../Upload product/Models/IProduct";
import { addToCart } from "../../../../redux/Orders/orderSlice";
import Spinner from "../../../layouts/Components/Spinner/Spinner";

let MensallProductstion:React.FC=()=>
{
    const navigate=useNavigate();
    let dispatch=useDispatch<dispatchAction>();
    const {allProducts,status}=useSelector((state:RootState)=>
    {
        return state.pro;
    });
  
    useEffect(()=>
    {
        dispatch(getMensCollection());
        
    },[])

    // add to cart

    let addCart=async(product:IProduct)=>
    {
       await dispatch(addToCart(product));
       navigate('/orders/cart')
    }
    return(
        <React.Fragment>
            
            {
                status === true ?
                <Spinner/>:
                <div className="container">
                <div className="row">
                    {
                       allProducts.length>0 &&
                       allProducts.map((product)=>
                            {
                                return(
                                    <div className="col-md-3 mt-3" key={product._id}>
                                    <div className="card">
                                    <div className="card-header">
                                        <Link to={`/products/${product._id}`}><img src={product.image} width={230} height={270}/></Link>
                                     
                                    </div>
                                    <div className="card-body text-center">
                                    <p>{product.name}</p>
                                    <p>&#8377;{product.price}</p>
                                    <button className="btn btn-outline-success" onClick={addCart.bind(this,product)}>Add to Cart</button>
                                </div>
                                </div>
                                </div>
                                )
                            })
                    }
                </div> 
            </div>
            }

            
        </React.Fragment>
    )
}
export default MensallProductstion;