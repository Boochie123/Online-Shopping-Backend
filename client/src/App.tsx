import React, { useEffect } from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Navbar from "./modules/layouts/Components/Navbar/Navbar"
import Home from "./modules/layouts/Components/Home/Home"
import KidsCollection from "./modules/Products/Components/Kids collection/KidsCollection"
import MensCollection from "./modules/Products/Components/Mens collection/MensCollection"
import WomensCollection from "./modules/Products/Components/Womens collections/WomensCollection"
import UploadProduct from "./modules/Products/Components/Upload product/UploadProduct"
import Cart from "./modules/Orders/Components/Cart/Cart"
import ProductList from "./modules/Orders/Components/Product-list/ProductList"
import UserLogin from "./modules/Users/Components/user-login/UserLogin"
import UserRegister from "./modules/Users/Components/user-register/UserRegister"
import { useDispatch } from "react-redux"
import { dispatchAction } from "./redux/store"
import { getUser } from "./redux/users/counterSlice"
import ProductDetails from "./modules/Products/Components/Product-Details/ProductDetails"
import Spinner from "./modules/layouts/Components/Spinner/Spinner"
import UserProfile from "./modules/Users/Components/user-profile/UserProfile"
import PrivateRoute from "./router/PrivateRoute"
import CheckOut from "./modules/Orders/Components/Check-out/CheckOut"
import Failure from "./Failure"
import Success from "./Success"
let App:React.FC=()=> {

  let dispatch=useDispatch<dispatchAction>();
  
  useEffect(()=>
  {
    dispatch(getUser());
  },[])

  
  return (
    <React.Fragment>
      <Router>
        <Navbar/>
        {/* <Spinner/> */}
        <Routes>
            {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="products/kids" element={<KidsCollection />} />
          <Route path="products/mens" element={<MensCollection />} />
          <Route path="products/womens" element={<WomensCollection />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="users/login" element={<UserLogin />} />
          <Route path="users/register" element={<UserRegister />} />
          <Route path="cancel" element={<Failure />} />
          <Route path="success" element={<Success />} />
          {/* Protected Routes using PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="products/upload" element={<UploadProduct />} />
            <Route path="orders/cart" element={<Cart />} />
            <Route path="orders/list" element={<ProductList />} />
            <Route path="users/profile" element={<UserProfile />} />
            <Route path="orders/checkout" element={<CheckOut/>} />
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
