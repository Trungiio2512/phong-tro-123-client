import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { path } from "../untils/constant";
import avatarDefault from "../assests/img_user_default_nobg.png";
import { base64Tofile } from "../untils/common/base64";
import SkeletonCutom from "./SkeletonCutom";
const User = (props) => {
  const { currentData } = useSelector((state) => state.user);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    if (Object.keys(currentData).length > 0) {
      setloading(false);
    }
  }, [currentData]);
  return (
    <div className="hidden lg:flex lg:items-center gap-2">
      <figure className="w-12 h-12 rounded-full border overflow-hidden border-gray-200">
        {loading ? (
          <SkeletonCutom circle height={"100%"} />
        ) : (
          <Link to={`${path.SYSTEM}/${path.USER_INFO}`}>
            <img
              className="object-cover w-full h-full"
              src={base64Tofile(currentData?.avatar) || avatarDefault}
              alt="avatar"
            />
          </Link>
        )}
      </figure>
      <div className="flex flex-col after:text-sm">
        <span className="flex items-center gap-2 ">
          Xin chào{" "}
          {loading ? (
            <SkeletonCutom className={"min-w-100"} />
          ) : (
            <strong>{currentData.name}</strong>
          )}
        </span>
        <span className="flex items-center gap-2 ">
          Mã tài khoản:{" "}
          {loading ? (
            <SkeletonCutom className={"min-w-100"} />
          ) : (
            <strong className="max-w-[160px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">
              {currentData.id}
            </strong>
          )}
        </span>
      </div>
    </div>
  );
};

User.propTypes = {};

export default User;
