import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import avatarDefault from "../assests/img_user_default_nobg.png";

const User = (props) => {
    const { currentData } = useSelector((state) => state.user);
    return (
        <div className="flex items-center gap-2">
            <img
                className="h-10 rounded-full object-cover border border-gray-200"
                src={currentData?.avatar || avatarDefault}
                alt="avatar"
            />
            <div className="flex flex-col">
                <span className="flex items-center gap-2">
                    Xin chào: <strong>{currentData.name}</strong>
                </span>
                <span className="flex items-center gap-2">
                    Mã tài khoản:{" "}
                    <strong className="max-w-[160px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">
                        {currentData.id}
                    </strong>
                </span>
            </div>
        </div>
    );
};

User.propTypes = {};

export default User;
