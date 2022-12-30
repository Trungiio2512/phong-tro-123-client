import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../../services/category";
import { path } from "../../untils/constant";
import { formatVietnameseToString } from "../../untils/common/fn";

const defaultLink = "p-3 transition-colors ease-in-out duration-75";
const linkActive = "bg-secondary2";
const notActive = "hover:bg-secondary2";

function Navigation() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await apiGetCategories();
            console.log(res);
            if (res?.err === 0) {
                setCategories(res?.data);
            }
        };

        fetchCategories();
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
