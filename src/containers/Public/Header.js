import { Link, useNavigate } from "react-router-dom";

import logo_nobg from "../../assests/logo_nobg.png";
import icons from "../../untils/icons";
import { Button } from "../../components";
import { useCallback } from "react";
import { path } from "../../untils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/auth";
const { AiOutlinePlusCircle } = icons;

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogging } = useSelector((state) => state.auth);

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, []);
    return (
        <div className="w-4/5">
            <div className="w-full flex items-center justify-between ">
                <Link to={path.HOME}>
                    <img src={logo_nobg} alt="logo" className="w-[240px] h-[70px] object-contain" />
                </Link>
                <div className="flex items-center gap-1">
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
                            <small className="text-lg">Tên</small>

                            <Button
                                onClick={() => dispatch(actions.logout())}
                                text={"Đăng xuất"}
                                textColor="text-white"
                                bgColor="bg-secondary1"
                            />
                        </>
                    )}
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
