import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { path } from "../untils/constant";
import { formatVietnameseToString } from "../untils/common/fn";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const defaultLink = "p-3 transition-colors ease-in-out duration-75";
const linkActive = "bg-secondary2";
const notActive = "hover:bg-secondary2";

function Navigation({ system = false }) {
    const dispatch = useDispatch();
    // const [categories, setCategories] = useState([]);
    const { categories } = useSelector((state) => state.app);
    useEffect(() => {
        dispatch(actions.getCategories());
    }, []);
    return (
        <div className={`${system ? "flex" : ""} w-full bg-secondary1`}>
            {system && (
                <div className="flex ">
                    <Link
                        to={path.HOME}
                        className="w-[256px] h-full text-white font-semibold text-xl flex items-center justify-center"
                    >
                        Phongtro123.com
                    </Link>
                </div>
            )}
            <nav
                className={`${
                    system ? "" : "w-4/5 m-auto"
                } md:flex md:items-center text-base font-medium text-white`}
            >
                <div className="flex">
                    <NavLink
                        to={path.HOME}
                        className={({ isActive }) =>
                            `${isActive ? linkActive : notActive} ${defaultLink}`
                        }
                    >
                        Trang chủ
                    </NavLink>
                </div>
                {categories.length > 0 &&
                    categories.map((category, i) => {
                        return (
                            <div key={category?.code} className="flex">
                                <NavLink
                                    to={`/${formatVietnameseToString(category?.value)}`}
                                    className={({ isActive }) =>
                                        `${isActive ? linkActive : notActive} ${defaultLink}`
                                    }
                                >
                                    {category?.value}
                                </NavLink>
                            </div>
                        );
                    })}
                <NavLink
                    to={path.CONTACT}
                    className={({ isActive }) =>
                        `${isActive ? linkActive : notActive} ${defaultLink}`
                    }
                >
                    Liên hệ
                </NavLink>
            </nav>
        </div>
    );
}

export default Navigation;
