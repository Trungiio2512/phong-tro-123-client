import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";
// const role = jwt(token)?.roleCode;
import { path } from "../../untils/constant";

export const PrivateRoute = ({ token, children }) => {
  if (token) {
    const role = jwt(token)?.roleCode;
    if (role === "R2" || role === "R1") {
      return children ? children : <Outlet />;
    }
  }

  // console.log(role);

  return <Navigate to={path.NOTFOUND} replace />;
};
export const PrivateRouteAdmin = ({ token, children }) => {
  if (token) {
    const role = jwt(token)?.roleCode;
    if (role === "R1") {
      return children ? children : <Outlet />;
    }
  }

  // console.log(role);

  return <Navigate to={path.NOTFOUND} replace />;
};
