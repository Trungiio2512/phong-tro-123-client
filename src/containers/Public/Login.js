import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputForm, Button } from "../../components";
import { apiRegister } from "../../services/auth";
import * as actions from "../../store/actions";

function Login() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isRegister, setRegister] = useState(null);
    const [payload, setPayload] = useState({
        name: "",
        phone: "",
        password: "",
    });

    const handleSubmit = async () => {
        dispatch(actions.register(payload));
    };

    useEffect(() => {
        // console.log(location.state?.flag);
        setRegister(location.state?.flag);
    }, [location.state?.flag]);
    return (
        <div className="bg-white w-full max-w-600 pt-[30px] px-[30px] pb-[100px] rounded-md border-1 border-stone-300">
            <h1 className="font-semibold text-3xl">
                {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
            </h1>
            <div className="w-full flex flex-col mt-5">
                {isRegister && (
                    <InputForm
                        label="họ tên"
                        value={payload.name}
                        name={"name"}
                        setValue={setPayload}
                    />
                )}
                <InputForm
                    label="số điện thoại"
                    value={payload.phone}
                    setValue={setPayload}
                    name={"phone"}
                />
                <InputForm
                    label="mật khẩu"
                    value={payload.password}
                    setValue={setPayload}
                    name={"password"}
                />
            </div>
            <div className="mt-5">
                <Button
                    text={isRegister ? "Đăng ký " : "Đăng nhập"}
                    textColor="text-white"
                    bgColor={"bg-secondary1"}
                    fullWidth
                    onClick={handleSubmit}
                />
            </div>
            <div className="w-full flex items-center justify-between mt-[30px]">
                {isRegister ? (
                    <small>
                        Bạn đã có tài khoản ?{" "}
                        <span
                            className="text-sm text-blue-500 hover:text-red-500 cursor-pointer"
                            onClick={() => setRegister(false)}
                        >
                            Đăng nhập ngay
                        </span>
                    </small>
                ) : (
                    <>
                        <small className="text-sm text-blue-500 hover:text-red-500 cursor-pointer">
                            Bạn quên mật khẩu
                        </small>
                        <small
                            onClick={() => setRegister(true)}
                            className="text-sm text-blue-500 hover:text-red-500 cursor-pointer"
                        >
                            Tạo tài khoản mới
                        </small>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
