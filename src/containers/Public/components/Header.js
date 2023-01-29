import jwt from "jwt-decode";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import logo_nobg from "../../../assests/logo_nobg.png";
import icons from "../../../untils/icons";
import { Button, User } from "../../../components";
import { path } from "../../../untils/constant";
import * as actions from "../../../store/actions/auth";
import { menuCreator, menuUser } from "../../../untils/menuMangager";
import Swal from "sweetalert2";
const { AiOutlinePlusCircle, AiOutlineLogout, BsFillCaretDownFill, GrUserAdmin } = icons;

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const headerRef = useRef();

    const { isLogging, token } = useSelector((state) => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = searchParams.get("page");

    const [isShowMenu, setisShowMenu] = useState(false);

    const menu = token && (jwt(token)?.roleCode !== "R3" ? menuCreator : menuUser);

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [pageNumber]);
    // console.log(typeUser);
    return (
        <div className="w-4/5" ref={headerRef}>
            <div className="w-full flex items-center justify-between ">
                <Link to={path.HOME}>
                    <img src={logo_nobg} alt="logo" className="w-[240px] h-[70px] object-contain" />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="flex items-center relative gap-2">
                        {!token && (
                            <>
                                <small className="text-lg">Phòng trọ 123 xin chào</small>

                                <Button
                                    onClick={() => navigate(`/${path.LOGIN}`)}
                                    text={"Đăng nhập"}
                                    textColor="text-white"
                                    bgColor="bg-secondary1"
                                />

                                <Button
                                    text={"Đăng ký"}
                                    onClick={() => navigate(`${path.REGISTER}`)}
                                    textColor="text-white"
                                    bgColor="bg-secondary1"
                                />
                            </>
                        )}
                        {token && (
                            <>
                                <User />
                                {token &&
                                    (jwt(token)?.roleCode === "R1" ? (
                                        <Button
                                            text={"Admin"}
                                            textColor="text-black"
                                            isBefore
                                            Icon={GrUserAdmin}
                                            onClick={() => navigate(`/${path.ADMIN}`)}
                                        />
                                    ) : null)}
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
                                        {menu.map((item) => {
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
                                                // navigate(path.LOGIN);
                                                Swal.fire(
                                                    "Đăng xuất",
                                                    "Thành công",
                                                    "success",
                                                ).then(() => {
                                                    setisShowMenu(false);
                                                    dispatch(actions.logout());
                                                    navigate(path.LOGIN);
                                                });
                                            }}
                                            className="text-blue-500 hover:text-orange-500 flex 
                                            p-2 items-center justify-start gap-2"
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
                        onClick={() =>
                            token ? navigate("/he-thong/tao-moi-bai-dang") : navigate(path.LOGIN)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(Header);
