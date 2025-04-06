import React from "react";
import { NavLink } from "react-router-dom";
import "../../../../index.css";
import { AuthUtil } from "../../../../util/AuthUtil";
import { useDispatch, useSelector } from "react-redux";
import { dispatchAction, RootState } from "../../../../redux/store";
import {  userLogout } from "../../../../redux/users/counterSlice";

let Navbar: React.FC = () => {
  let dispatch = useDispatch<dispatchAction>();
  let isated = useSelector((state: RootState) => {
    return state.slice;
  });

  let {isAuthenticated,user}=isated;

  let userlout = () => {
    dispatch(userLogout());
  };

  // useEffect(() => {
  //   if (AuthUtil.isLoggedIn() && isAuthenticated) {
  //     console.log("Fetching user details...");
  //     dispatch(getUser());  
  //   }
  // }, [isated, dispatch]);
  
  return (
    
    <React.Fragment>
      <nav className="navbar navbar-dark back navbar-expand-sm sticky-top">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <i className="fa-solid fa-cart-shopping"></i> <span> JSPKART</span>
          </NavLink>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="products/mens" className="nav-link">
                  Mens collection
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="products/womens" className="nav-link">
                  Womens collection
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="products/kids" className="nav-link">
                  Kids collection
                </NavLink>
              </li>
              {AuthUtil.isLoggedIn() && isAuthenticated && (
                <React.Fragment>
                  {/* Show Upload Product only for Admin */}
                    {
                    user && user.isAdmin && (
                      <li className="nav-item">
                        <NavLink to="products/upload" className="nav-link">
                          Upload Product
                        </NavLink>
                      </li>
                    )}
                  <li className="nav-item">
                    <NavLink to="orders/cart" className="nav-link">
                      Cart
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="orders/list" className="nav-link">
                    Orders
                  </NavLink>
                </li>
                </React.Fragment>
              )}
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav ">
                {
                AuthUtil.isLoggedIn() && isAuthenticated ? 
                  <React.Fragment>
                    {
                     user && Object.keys(user || {}).length > 0 &&
                      <NavLink to="/users/profile" className="nav-link" >
                      <img src={user.avatar} width={25} height={25} className="rounded-circle"/>
                       &nbsp;{user.name}
                       
                       </NavLink>
                    }
                    <NavLink to="/" className="nav-link" onClick={userlout}>
                    <span className="fa fa-sign-out"></span> Logout
                    </NavLink>
                  </React.Fragment>: 
                  <React.Fragment>
                    <li className="nav-item">
                      <NavLink to="users/login" className="nav-link">
                       <span className="fa fa-sign-in"></span> Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="users/register" className="nav-link">
                      <span className="fa fa-user"></span> Register
                      </NavLink>
                    </li>
                  </React.Fragment>
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
