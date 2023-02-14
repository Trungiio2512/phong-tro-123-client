import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Button } from "antd";

import icons from "../../../untils/icons";
import logoAdmin from "../../../assests/logo_admin.jpg";
import { path } from "../../../untils/constant";

const { GrLinkPrevious, GrNext, FiHome, AiOutlineUnorderedList } = icons;

const NewSidebar = ({ open, setopen, menu }) => {
  return (
    <>
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 min-h-screen pt-7 bg-dark-purple relative hidden md:block`}
      >
        <button
          onClick={() => setopen(!open)}
          className={`absolute duration-300 cursor-pointer right-[-15px] top-9 rounded-full p-2 border-2 bg-white border-dark-purple z-10  ${
            !open && "rotate-180"
          }`}
        >
          <GrNext size={16} className="m-auto" />
        </button>
        <div className="flex gap-x-4 items-center px-4">
          <figure
            className={`cursor-pointer shrink-0 w-[50px] h-[50px] rounded-full border border-white overflow-hidden duration-300 ${
              open && "rotate-[360deg]"
            }`}
          >
            <img className="w-full h-full object-cover" src={logoAdmin} alt="admin" />
          </figure>
          <h1
            className={`text-white origin-left font-mediun text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Admintration
          </h1>
        </div>
        <div className="mt-4 flex flex-col gap-2 relative ">
          <Link
            to={path.HOME}
            className={`flex group px-6 py-2 cursor-pointer  text-sm items-center rounded-md relative gap-x-4 duration-300 hover:bg-light-white text-gray-300
              `}
          >
            <span>
              <FiHome size={20} />
            </span>
            <span
              style={{ transitionDelay: `00ms` }}
              className={`${!open && "scale-0"} whitespace-pre duration-200 `}
            >
              Trang chủ
            </span>
            <span
              className={`${
                open ? "hidden" : ""
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit 
                                      z-10 `}
            >
              Trang chủ
            </span>
          </Link>
          {menu.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex group px-6 py-2 cursor-pointer  text-sm items-center rounded-md relative gap-x-4 duration-300 ${
                    isActive ? "bg-light-white text-white " : "hover:bg-light-white text-gray-300"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span
                  style={{ transitionDelay: `${index}00ms` }}
                  className={`${!open && "scale-0"} whitespace-pre duration-200 `}
                >
                  {item.text}
                </span>
                <span
                  className={`${
                    open ? "hidden" : ""
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit 
                                      z-10 `}
                >
                  {item.text}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="md:hidden absolute top-0 right-0 p-2">
        <Button onClick={() => setopen(!open)}>
          <AiOutlineUnorderedList />
        </Button>
      </div>
      <ul
        className={`md:hidden py-4  shadow-md absolute bg-blue-100 top-12 bottom-0  w-full transition-all duration-500 ease-in ${
          open ? "left-0 z-10" : "left-[-100%] z-[-1]"
        }`}
      >
        <li>
          <Link to={`${path.HOME}`}>Trang chủ</Link>
        </li>
        {menu.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path}>{item.text}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

NewSidebar.propTypes = {};

export default NewSidebar;
