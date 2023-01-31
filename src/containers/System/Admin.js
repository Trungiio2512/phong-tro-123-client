import React, { useState } from "react";
import PropTypes from "prop-types";
import icons from "../../untils/icons";
import logoAdmin from "../../assests/logo_admin.jpg";
import { menuAdmin } from "../../untils/menuMangager";
import { Link, NavLink, Outlet } from "react-router-dom";
import { NewSidebar } from "./components";
const { GrLinkPrevious, GrNext } = icons;

const Admin = (props) => {
  const [open, setopen] = useState(false);
  // const menu/
  return (
    <div className="flex ">
      
      <NewSidebar open={open} setopen={setopen} menu={menuAdmin} />
      <div className="p-7 text-2xl font-semibold min-h-screen bg-gray-200 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

Admin.propTypes = {};

export default Admin;
