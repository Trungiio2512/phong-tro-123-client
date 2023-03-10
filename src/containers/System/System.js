import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";

import { path } from "../../untils/constant";
import { useSelector } from "react-redux";
import { NewSidebar } from "./components";
import { menuCreator, menuUser } from "../../untils/menuMangager";
const System = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const [open, setopen] = useState(false);

  if (!token) {
    return <Navigate to={path.NOTFOUND} replace />;
  }

  const menu = jwt(token)?.roleCode !== "R3" ? menuCreator : menuUser;
  return children ? (
    children
  ) : (
    <div className="w-full min-h-screen md:flex overflow-hidden">
      {/* <div className="flex w-full min-h-screen flex-auto relative"> */}
      <h2 className="font-bold text-2xl text-black md:hidden p2">Quản lý cá nhân</h2>
      <NewSidebar open={open} setopen={setopen} menu={menu} />
      <div className={`bg-gray-200 p-8 shadow-md min-h-full overflow-hidden flex-1`}>
        <Outlet />
      </div>
      {/* </div> */}
    </div>
  );
};

System.propTypes = {};

export default System;
