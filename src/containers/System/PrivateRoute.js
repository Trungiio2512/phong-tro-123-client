import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";
import { path } from "../../untils/constant";

export const PrivateRoute = ({ token, children }) => {
    const role = jwt(token)?.roleCode;
    // console.log(role);
    if (role === "R2" || role === "R1") {
        return children ? children : <Outlet />;
    }

    return <Navigate to={path.NOTFOUND} replace />;
};
export const PrivateRouteAdmin = ({ token, children }) => {
    const role = jwt(token)?.roleCode;
    // console.log(role);
    if (role === "R1") {
        return children ? children : <Outlet />;
    }

    return <Navigate to={path.NOTFOUND} replace />;
};
