import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { path } from "../untils/constant";
import { formatVietnameseToString } from "../untils/common/fn";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const defaultLink = "p-2 font-semibold";
const linkActive = "text-blue-700 bg-blue-100";
const notActive = "hover:text-blue-700";

function Navigation() {
  const dispatch = useDispatch();
  // const [categories, setCategories] = useState([]);
  const { categories } = useSelector((state) => state.app);
  // useEffect(() => {}, []);
  return (
    <nav
      className={`sticky w-full top-0 z-10 border-b border-gray-300 lg:flex lg:items-center hidden bg-white shadow-md`}
    >
      <div className="text-base text-gray-600 flex justify-between ">
        <NavLink
          to={path.HOME}
          className={({ isActive }) => `${isActive ? linkActive : notActive} ${defaultLink}`}
        >
          Trang chủ
        </NavLink>
        {categories.length > 0 &&
          categories.map((category, i) => {
            return (
              <NavLink
                key={category?.code}
                to={`/${formatVietnameseToString(category?.value)}`}
                className={({ isActive }) => `${isActive ? linkActive : notActive} ${defaultLink}`}
              >
                {category?.value}
              </NavLink>
            );
          })}
        <NavLink
          to={path.CONTACT}
          className={({ isActive }) => `${isActive ? linkActive : notActive} ${defaultLink}`}
        >
          Liên hệ
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
