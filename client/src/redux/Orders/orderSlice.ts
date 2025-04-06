import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../modules/Products/Components/Upload product/Models/IProduct";
import { AuthUtil } from "../../util/AuthUtil";
import { TokenUtil } from "../../util/TokenUtil";
import { IOrder } from "../../modules/Orders/Models/IOrder";
import axios from "axios";

interface orderState
{
    loading:boolean;
    cartItems:IProduct[];
    order:any;
    errorMessage:string;
    orders:IOrder[]
}
// Load cart from localStorage if available
const storedCart = localStorage.getItem("cartItems");
const initialCart = storedCart ? JSON.parse(storedCart) : [];

let data:orderState={
    loading:false,
    cartItems:initialCart,
    order:{},
    errorMessage:'',
    orders:[] as IOrder[]
}


export const postOrders = createAsyncThunk<IOrder, any>(
    "post/order",
    async (order, { rejectWithValue }) => {
        try {
            if (!AuthUtil.getToken()) {
                return rejectWithValue("Unauthorized: No token provided");
            }

            const token = AuthUtil.getToken();
            TokenUtil.setTokenHeader(token);

            console.log("📤 Sending order:", order);
            const response = await axios.post<IOrder>(
                "http://127.0.0.1:5000/api/orders/place",
                order
            );

            console.log("✅ Order placed successfully:", response.data);
            return response.data; // ✅ Always returning IOrder
        } catch (error: any) {
            console.error("❌ Order placement error:", error);
            return rejectWithValue(
                error.response?.data?.message || error.message || "Unknown error"
            ); // ✅ Get meaningful error message
        }
    }
);

export const getOrders=createAsyncThunk('get/orders',async ()=>
{
    const token = AuthUtil.getToken();
    TokenUtil.setTokenHeader(token);
    const response = await axios.get<IOrder[]>("http://127.0.0.1:5000/api/orders");
    return response.data;
})

const orderSlice=createSlice(
    {
        name:'order',
        initialState:data,
        reducers:{
            addToCart: (state, action: PayloadAction<IProduct>) => {
                state.cartItems.push(action.payload);
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // ✅ Save to localStorage
            },
            inc: (state, action: PayloadAction<string>) => {
                state.cartItems = state.cartItems.map(cartItem =>
                    cartItem._id === action.payload ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
                );
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // ✅ Update localStorage
            },
            dec: (state, action: PayloadAction<string>) => {
                state.cartItems = state.cartItems.map(cartItem =>
                    cartItem._id === action.payload ? { ...cartItem, qty: Math.max(cartItem.qty - 1, 1) } : cartItem
                );
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // ✅ Update localStorage
            },
            deletProd: (state, action: PayloadAction<string>) => {
                state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== action.payload);
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // ✅ Update localStorage
            },
            clearCart: (state) => {
                state.cartItems = [];
                localStorage.removeItem("cartItems"); // ✅ Remove from localStorage
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(postOrders.pending, (state) => {
                    console.log("🔄 postOrders is pending...");
                    state.loading = true;
                })
                .addCase(postOrders.fulfilled, (state, action) => {
                    console.log("🟢 postOrders.fulfilled action:", action);
                    console.log("🟢 action.payload:", action.payload); // Make sure it's not empty
                    state.loading = false;
                    state.order = action.payload;
                })
                .addCase(postOrders.rejected, (state, action) => {
                    console.error("❌ postOrders failed:", action.payload); // ✅ Debug
                    state.loading = false;
                    state.errorMessage = action.payload as string;
                }),
                builder
                .addCase(getOrders.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getOrders.fulfilled, (state, action:PayloadAction<IOrder[]>) => {
                    state.loading = false;
                    state.orders = action.payload;
                })
                .addCase(getOrders.rejected, (state, action) => {
                   state.loading = false;
                    state.errorMessage = action.payload as string;
                });
        }
    }
)

export const {addToCart,inc,dec,deletProd}=orderSlice.actions
export default orderSlice.reducer;