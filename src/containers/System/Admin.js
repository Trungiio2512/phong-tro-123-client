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
  // const navRef =
  return (
    <div className="w-full min-h-screen flex md:flex-row flex-col overflow-hidden">
      <h2
        className="font-bold text-2xl text-black md:hidden p-2
      "
      >
        Admin
      </h2>
      <NewSidebar open={open} setopen={setopen} menu={menuAdmin} />
      <div className={`bg-gray-200 p-8 shadow-md min-h-full overflow-hidden flex-1`}>
        <Outlet />
      </div>
    </div>
  );
};

Admin.propTypes = {};

export default Admin;
