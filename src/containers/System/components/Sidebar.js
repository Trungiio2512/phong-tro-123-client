import React from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo_nobg from "../../../assests/logo_nobg.png";
import { menuSidebarManager } from "../../../untils/menuMangager";
import * as actions from "../../../store/actions";
import { path } from "../../../untils/constant";
const Sidebar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentData } = useSelector((state) => state.user);
    return (
        <div className="max-w-[256px] w-full h-full fixed left-0 top-[48px]">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center">
                    <img
                        src={logo_nobg}
                        alt="avatar"
                        className="w-12 h-12 rounded-full border border-gray-400"
                    />
                    <div className="flex flex-col">
                        <strong className="text-base">{currentData.name}</strong>
                        <span className="font-normal text-gray-400 text-sm ">
                            {currentData?.phone}
                        </span>
                    </div>
                </div>
                <span className="flex items-center gap-2 text-sm">
                    Mã thành viên:{" "}
                    <strong className=" block max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {currentData?.id}
                    </strong>
                </span>
            </div>
            <div>
                {menuSidebarManager.map((item) => {
                    return (
                        <NavLink
                            className={({ isActive }) =>
                                `${
                                    isActive ? "font-semibold bg-gray-200" : "text-gray-500"
                                } p-4 flex items-center gap-2 hover:bg-gray-200`
                            }
                            key={item?.id}
                            to={item?.path}
                        >
                            <span>{item.icon}</span>
                            <span> {item.text}</span>
                        </NavLink>
                    );
                })}
                <button
                    className=" p-4 text-gray-500 flex items-center gap-2 hover:bg-gray-200 w-full"
                    onClick={() => {
                        navigate(`/${path.LOGIN}`);
                        dispatch(actions.logout());
                    }}
                >
                    Thoát
                    {/* <span>{item.icon}</span>
                    <span> {item.text}</span> */}
                </button>
            </div>
        </div>
    );
};

Sidebar.propTypes = {};

export default Sidebar;
