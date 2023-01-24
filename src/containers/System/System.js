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
        <div className="w-full min-h-screen flex flex-col items-center overflow-hidden">
            {" "}
            <Header />
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
