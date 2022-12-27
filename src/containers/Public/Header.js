import { Link, useNavigate } from "react-router-dom";

import logo_nobg from "../../assests/logo_nobg.png";
import icons from "../../untils/icons";
import { Button } from "../../components";
import { useCallback } from "react";
import { path } from "../../untils/constant";

const { AiOutlinePlusCircle } = icons;

function Header() {
    const navigate = useNavigate();
    const goLogin = useCallback(() => {
        navigate(path.LOGIN);
    }, []);
    return (
        <div className="w-1100">
            <div className="w-full flex items-center justify-between ">
                <Link to={path.HOME}>
                    <img
                        src={logo_nobg}
                        alt="logo"
                        className="w-[240px] h-[70px] object-contain"
                    />
                </Link>
                <div className="flex items-center gap-1">
                    <small className="text-lg">Phòng trọ 123 xin chào</small>

                    <Button
                        onClick={() => goLogin()}
                        text={"Đăng nhập"}
                        textColor="text-white"
                        bgColor="bg-secondary1"
                    />

                    <Button
                        text={"Đăng ký"}
                        onClick={() => goLogin()}
                        textColor="text-white"
                        bgColor="bg-secondary1"
                    />
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
