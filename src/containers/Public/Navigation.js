import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { path } from "../../untils/constant";
import { formatVietnameseToString } from "../../untils/common/fn";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const defaultLink = "p-3 transition-colors ease-in-out duration-75";
const linkActive = "bg-secondary2";
const notActive = "hover:bg-secondary2";

function Navigation() {
    const dispatch = useDispatch();
    // const [categories, setCategories] = useState([]);
    const { categories } = useSelector((state) => state.app);
    useEffect(() => {
      
        dispatch(actions.getCategories());
    }, []);
    return (
        <div className="w-full bg-secondary1 ">
            <ul className="w-4/5 m-auto h-full flex items-center text-base font-medium text-white ">
                <li className="flex">
                    <NavLink
                        to={path.HOME}
                        className={({ isActive }) =>
                            `${isActive ? linkActive : notActive} ${defaultLink}`
                        }
                    >
                        Trang chủ
                    </NavLink>
                </li>
                {categories.length > 0 &&
                    categories.map((category, i) => {
                        return (
                            <li key={category?.code} className="flex">
                                <NavLink
                                    to={formatVietnameseToString(category?.value)}
                                    className={({ isActive }) =>
                                        `${isActive ? linkActive : notActive} ${defaultLink}`
                                    }
                                >
                                    {category?.value}
                                </NavLink>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default Navigation;
