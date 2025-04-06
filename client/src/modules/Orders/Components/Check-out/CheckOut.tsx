import React from "react";
import '../../../../index.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchAction, RootState } from "../../../../redux/store";
import { cartUtil } from "../../../../util/CartUtil";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";
import { postOrders } from "../../../../redux/Orders/orderSlice";
let CheckOut:React.FC=()=>
{
    let dispatch=useDispatch<dispatchAction>();
     let getCart=useSelector((state:RootState)=>
        {
            return state.order
        })
    let isated = useSelector((state: RootState) => {
        return state.slice;
      });
    
      let{cartItems,orders}=getCart
      let {user}=isated;

    //   let items=cartItems.map((cartItem)=>
    // {
    //     return{
    //         name:cartItem.name,
    //         brand:cartItem.brand,
    //         price:cartItem.price,
    //         qty:cartItem.qty
    //     }
    // });

    // let order={
    //     items:items,
    //     tax:cartUtil.calcTax(cartItems),
    //     total:cartUtil.grandTotal(cartItems)
    // }

      const makePayment = async () => {
        const stripe: Stripe | null = await loadStripe("pk_test_51R3PdI03Katgf0PvuFOCrVQuqnR2yLiiDdRouOxPJf4G6UJciXdNOkFrTVJLgbrF5GfZGz1qJWLdiBJjX0luXyDg00rHMt0W1R");
    
        if (!stripe) {
            console.error("Stripe failed to load.");
            return;
        }
    
        const body = {
            products: cartItems, // Ensure getCart is correctly defined
        };
    
        const headers = {
            "Content-Type": "application/json",
        };
    
        try {
            const response = await axios.post<{ id: string }>(
                "http://127.0.0.1:5000/api/payments/create-checkout-session",
                body,
                { headers }
            );
    
            const session = response.data;
    
            if (session && session.id) {
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
    
                if (result?.error) {
                    console.error(result.error);
                }
                // if (!result?.error) {
                //     // Only dispatch postOrders when payment is successful
                //     console.log("Dispatching postOrders with:", order);
                //     dispatch(postOrders(order));
                // } else {
                //     console.error(result.error);
                // }
            }
           
            
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return(
        <React.Fragment>
            <div className="container mt-1">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header back">
                                <h2 className="text-white">Billing address <Link to='/users/profile' className="ms-5 btn btn-outline-light">Update Address</Link></h2>                           
                            </div>
                            <div className="card-body bg-dark-subtle">
                            <ul className="list-group">
                                        <li className="list-group-item"><>City: {user.address.city}</></li>
                                        <li className="list-group-item"><>Country: {user.address.country}</></li>
                                        <li className="list-group-item"><>Flat: {user.address.flat}</></li>
                                        <li className="list-group-item"><>Landmark: {user.address.landmark}</></li>
                                        <li className="list-group-item"><>Mobile: {user.address.mobile}</></li>
                                        <li className="list-group-item"><>Pin: {user.address.pin}</></li>
                                        <li className="list-group-item"><>State: {user.address.state}</></li>
                                        <li className="list-group-item"><>Street: {user.address.street}</></li>                     
                                    </ul>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <div className="card-header back">
                                <h2 className="text-white">Payment Type</h2>
                            </div>
                            <div className="card-body bg-dark-subtle">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault"/>
                                <label className="form-check-label">
                                   Credit/Debit Card
                                </label>
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label">
                                    Cash on delivery
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                            <div className="card bg-dark-subtle">
                                <div className="card-header back text-center">
                                    <h2 className="text-white">Your Cart Items & Total</h2>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                    {
                                        cartItems.map((cartItem)=>
                                        {
                                            return(
                                                <li className="list-group-item" key={cartItem._id}>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                    <img src={cartItem.image} width={50} height={70}/>
                                                    </div>
                                                    <div className="col-md-8">
                                                        {cartItem.name}<br/>
                                                        {cartItem.brand}<br/>
                                                        <b className="text-danger">&#8377;{cartItem.price}</b>
                                                    </div>
                                                </div>
                                                </li>
                                            )
                                        })
                                    }
                                     <li className="list-group-item">Total: <b> &#8377;{cartUtil.calcTotal(cartItems)}</b>
                                     </li>
                                      <li className="list-group-item">Tax: <b>{cartUtil.calcTax(cartItems)}</b>

                                      </li>
                                        <li className="list-group-item">GrandTotal: <b>{cartUtil.grandTotal(cartItems)}</b>

                                        </li>
                                    </ul>
                                    <button className="btn btn-danger mt-2" onClick={makePayment}>Pay now</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default CheckOut;


