import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../untils/constant";
import { useSelector } from "react-redux";
import { Header, Sidebar } from "./components";
const System = ({ children }) => {
    const { isLogging } = useSelector((state) => state.auth);

    if (!isLogging) {
        return <Navigate to={path.NOTFOUND} replace />;
    }

    return children ? (
        children
    ) : (
        <div className="w-full h-screen flex flex-col items-center">
            {" "}
            <Header />
            <div className="flex w-full flex-auto">
                <Sidebar />
                <div className=" bg-white shadow-md h-full flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

System.propTypes = {};

export default System;
