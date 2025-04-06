import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthUtil } from "../util/AuthUtil";

const PrivateRoute: React.FC = () => {
  return AuthUtil.isLoggedIn() ? <Outlet /> : <Navigate to="/users/login" replace />;
};

export default PrivateRoute;
