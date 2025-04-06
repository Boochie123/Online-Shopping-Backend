import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchAction, RootState } from "../../../../redux/store";
import { getOrders } from "../../../../redux/Orders/orderSlice";
import { Link } from "react-router-dom";


let ProductList:React.FC=()=>
{
    let dispatch=useDispatch<dispatchAction>();

    useEffect(()=>
    {
        dispatch(getOrders())
    },[])
    const orders  = useSelector((state: RootState) =>
        {

     return state.order.orders
    });
    console.log(orders);
    return(
        <React.Fragment>
            {
                orders.length>0?
                <div className="container">
                <div className="row">
                    <div className="col">
                    <ul className="list-group">
                            {orders.map((order ) => (
                                <li key={order._id} className="list-group-item">
                                    <h5>Order ID: {order._id}</h5>
                                    <p>Total: ${order.total}</p>
                                    <h6>Products:</h6>
                                    <ul>
                                        {order.items.map((product) => (
                                            <li key={product._id}>
                                                {product.name} - {product.qty} x ${product.price}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>: 
            <div className="text-center mt-3">
                    <h1>No Orders to display</h1>
                    <Link to='/' className="btn btn-success ">Shop now</Link>
                    </div>
            }
            
        </React.Fragment>
    )
}
export default ProductList;