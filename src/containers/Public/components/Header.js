import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

import logo_nobg from "../../../assests/logo_nobg.png";
import icons from "../../../untils/icons";
import { Button, User } from "../../../components";
import { path } from "../../../untils/constant";
import * as actions from "../../../store/actions/auth";
import { menuHomeManager } from "../../../untils/menuMangager";

const { AiOutlinePlusCircle, AiOutlineLogout, BsFillCaretDownFill } = icons;

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const headerRef = useRef();

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = searchParams.get("page");

    const [isShowMenu, setisShowMenu] = useState(false);

    const { isLogging } = useSelector((state) => state.auth);

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, []);

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [pageNumber]);

    return (
        <div className="w-4/5" ref={headerRef}>
            <div className="w-full flex items-center justify-between ">
                <Link to={path.HOME}>
                    <img src={logo_nobg} alt="logo" className="w-[240px] h-[70px] object-contain" />
                </Link>
                <div className="flex items-center">
                    <div className="flex items-center gap-1 relative">
                        {!isLogging && (
                            <>
                                <small className="text-lg">Phòng trọ 123 xin chào</small>

                                <Button
                                    onClick={() => goLogin(false)}
                                    text={"Đăng nhập"}
                                    textColor="text-white"
                                    bgColor="bg-secondary1"
                                />

                                <Button
                                    text={"Đăng ký"}
                                    onClick={() => goLogin(true)}
                                    textColor="text-white"
                                    bgColor="bg-secondary1"
                                />
                            </>
                        )}
                        {isLogging && (
                            <>
                                <User />

                                <Button
                                    onClick={() => setisShowMenu(!isShowMenu)}
                                    text={"Quản lý tài khoản"}
                                    textColor="text-white"
                                    bgColor="bg-secondary1"
                                    isAfter
                                    Icon={BsFillCaretDownFill}
                                />
                                {isShowMenu && (
                                    <div className="absolute right-0 top-full bg-white shadow-md rounded-md min-w-200 flex flex-col">
                                        {menuHomeManager.map((item) => {
                                            return (
                                                <Link
                                                    className="p-2 flex items-center gap-2 text-blue-500 hover:text-orange-500"
                                                    key={item?.id}
                                                    to={item?.path}
                                                >
                                                    <span>{item.icon}</span>
                                                    <span> {item.text}</span>
                                                </Link>
                                            );
                                        })}
                                        <button
                                            onClick={() => {
                                                setisShowMenu(false);
                                                dispatch(actions.logout());
                                            }}
                                            className="text-blue-500 hover:text-orange-500 flex items-center justify-center gap-2"
                                        >
                                            <span>
                                                <AiOutlineLogout />
                                            </span>
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <Button
                        isAfter
                        text={"Đăng tin mới"}
                        Icon={AiOutlinePlusCircle}
                        textColor="text-white"
                        bgColor="bg-secondary2"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
