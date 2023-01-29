import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

import { Navigation } from "../../components";
import { path } from "../../untils/constant";
import { useSelector } from "react-redux";
import { Sidebar } from "./components";
const System = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to={path.NOTFOUND} replace />;
    }

    return children ? (
        children
    ) : (
        <div className="w-full min-h-screen flex flex-col items-center overflow-hidden">
            {" "}
            <div className="flex items-center w-full fixed top-0 z-50">
                <Navigation system />
            </div>
            <div className="flex w-full h-full flex-auto mt-[48px]">
                <Sidebar />
                <div className="ml-[256px] bg-white shadow-md h-full overflow-y-scroll flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

System.propTypes = {};

export default System;
