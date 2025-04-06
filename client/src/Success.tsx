import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartUtil } from "./util/CartUtil";
import { postOrders } from "./redux/Orders/orderSlice";
import { dispatchAction, RootState } from "./redux/store";

const Success: React.FC = () => {
    const dispatch = useDispatch<dispatchAction>();

    // Get cart items and orders from Redux
    const { cartItems, orders } = useSelector((state: RootState) =>
        {

     return state.order
    });
    useEffect(() => {
        if (cartItems.length > 0) {
            const order = {
                items: cartItems,
                tax: cartUtil.calcTax(cartItems),
                total: cartUtil.grandTotal(cartItems),
            };
            console.log("Dispatching postOrders:", order);
            dispatch(postOrders(order));
        }
    }, [dispatch, cartItems]);

    let isated = useSelector((state: RootState) => {
        return state.slice.user;
      });

    return (
        <div className="container bg-secondary-subtle">
            <h2 className="text-center mt-1">Order Summary</h2>

            {/* Order Details */}
            <div>
                <p><strong>Order ID:</strong> </p>
                <p><strong>Name:</strong> {isated.name}</p>
                <p><strong>Email:</strong> {isated.email}</p>
                <p><strong>Mobile:</strong> {isated?.address?.mobile || "N/A"}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            {/* Order Table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>Item Name</th>
                        <th>Brand</th>
                        <th>Item Qty</th>
                        <th>Item Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.qty}</td>
                            <td>₹{item.price}</td>
                            <td>₹{(Number(item.price) * item.qty).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Tax and Grand Total */}
            <div >
                <p><strong>Tax:</strong> ₹{cartUtil.calcTax(cartItems)}</p>
                <p><strong>Grand Total:</strong> ₹{cartUtil.grandTotal(cartItems)}</p>
            </div>

            <p className="text-danger">
                <strong>NOTE:</strong> Your shipment will be delivered within 3 business days.
            </p>

            {/* Buttons */}
            <div >
                <button className="btn btn-success" onClick={() => window.print()}>Print</button>
                <button className="btn btn-success ms-3">DONE</button>
            </div>
        </div>
    );
};


export default Success;
