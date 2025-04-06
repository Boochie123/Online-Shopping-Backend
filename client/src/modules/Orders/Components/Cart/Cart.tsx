import React from "react";
import '../../../../index.css';
import {  useDispatch, useSelector } from "react-redux";
import {  dispatchAction, RootState } from "../../../../redux/store";
import { Link } from "react-router-dom";
import { cartUtil } from "../../../../util/CartUtil";
import { dec, deletProd, inc } from "../../../../redux/Orders/orderSlice";

let Cart:React.FC=()=>
{
    let dispatch=useDispatch<dispatchAction>();
    let getCart=useSelector((state:RootState)=>
    {
        return state.order.cartItems
    })
    
    //increment the product
    let incProd=(prod:string | undefined)=>
    {
        if(!prod)
        {
            console.error('invalid product id');
            return;
        }
        dispatch(inc(prod));
    }
    //decrement the product
    let decProd=(prod:string | undefined)=>
        {
            if(!prod)
            {
                console.error('invalid product id');
                return;
            }
            dispatch(dec(prod));
        }
    //delete the prouct
        let delProd=(prod:string | undefined)=>
            {
                if(!prod)
                {
                    console.error('invalid product id');
                    return;
                }
                dispatch(deletProd(prod));
            }
    return(
        <React.Fragment>            
            <div className="container">
            {
              getCart.length>0?
                <div className="row">
                    
                    
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header back text-center text-white mt-3">
                                <h1>Your Cart Items</h1>
                            </div>
                            <div className="card-body ">
                            <table className="table table-striped bg-body-secondary">
                                             <thead className="text-center">
                                                <tr>
                                                    <th>Sno</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Action</th>
                                                 </tr>
                                                </thead>
                                {   
                                   getCart.map((cartitem,index)=>
                                    {
                                        return(
                                            <tbody className="text-center">
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td><img src={cartitem.image} width={30} height={30}/></td>
                                                        <td>{cartitem.name}</td>
                                                        <td>{cartitem.price}</td>
                                                        <td><span className="fa fa-minus-circle me-1" onClick={decProd.bind(this,cartitem._id)}></span>{cartitem.qty}<span className="fa fa-plus-circle ms-1" onClick={incProd.bind(this,cartitem._id)}></span></td>
                                                        <td><button className="btn btn-danger btn-sm " onClick={delProd.bind(this,cartitem._id)}>Delete</button></td>
                                                    </tr>
                                                </tbody>
                                        )
                                    })
                                       
                                }
                                </table>
                                
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-header back text-center text-white mt-3">
                                <h1>Your Total</h1>
                            </div>
                            <div className="card-body text-center">
                                <ul className="list-group">
                                    <li className="list-group-item">Total:&#8377;{cartUtil.calcTotal(getCart)}</li>
                                    <li className="list-group-item">Tax:{cartUtil.calcTax(getCart)}</li>
                                    <li className="list-group-item">GrandTotal:{cartUtil.grandTotal(getCart)}</li>
                                </ul>
                                <Link to='/orders/checkout'><button className="btn btn-success btn-md mx-2 my-2">Checkout</button></Link>
                                <Link to='/'><button className="btn btn-dark btn-md">Shop More</button></Link>
                            </div>
                        </div>
                    </div>
                   
                </div>:
                    <div className="text-center mt-3">
                    <h1>No Cart items to display</h1>
                    <Link to='/' className="btn btn-success ">Shop now</Link>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}
export default Cart;