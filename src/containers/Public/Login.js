import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputForm, Button } from "../../components";
import * as actions from "../../store/actions";

function Login() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { isLogging } = useSelector((state) => state.auth);

    const [isRegister, setRegister] = useState(null);
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setPayload] = useState({
        name: "",
        phone: "",
        password: "",
    });

    const handleSubmit = () => {
        const finalPayload = isRegister
            ? payload
            : { phone: payload.phone, password: payload.password };
        const invalid = validate(finalPayload);
        // console.log(invalid);
        // console.log(finalPayload);
        if (invalid === 0) {
            isRegister
                ? dispatch(actions.register(finalPayload))
                : dispatch(actions.login(finalPayload));
        }
    };

    const validate = (payload) => {
        let invalid = 0;
        let fields = Object.entries(payload);

        fields.forEach((field) => {
            if (field[1] === "") {
                setInvalidFields((prev) => [
                    ...prev,
                    {
                        name: field[0],
                        message: "Bạn không được bỏ trường này",
                    },
                ]);
                invalid++;
            }
            console.log(">>check :" + invalid);
        });

        fields.forEach((field) => {
            switch (field[0]) {
                case "password":
                    if (field[1].length < 6) {
                        setInvalidFields((prev) => [
                            ...prev,
                            { name: field[0], message: "Mật khẩu tối thiểu 6 kí tự" },
                        ]);
                        invalid++;
                    }
                    break;
                case "phone":
                    if (!+field[1]) {
                        setInvalidFields((prev) => [
                            ...prev,
                            { name: field[0], message: "Số điện thoại không hợp lệ" },
                        ]);
                        invalid++;
                    }
                    break;
                default:
                    break;
            }
            console.log(">> check phone pass " + invalid);
        });
        return invalid;
    };

    useEffect(() => {
        // console.log(location.state?.flag);
        setRegister(location.state?.flag);
    }, [location.state?.flag]);

    useEffect(() => {
        isLogging && navigate("/");
    }, [isLogging, navigate]);
    return (
        <div className="bg-white w-full max-w-600 pt-[30px] px-[30px] pb-[100px] rounded-md border-1 border-stone-300">
            <h1 className="font-semibold text-3xl">
                {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
            </h1>
            <div className="w-full flex flex-col mt-5">
                {isRegister && (
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="họ tên"
                        value={payload.name}
                        name={"name"}
                        setValue={setPayload}
                    />
                )}
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label="số điện thoại"
                    value={payload.phone}
                    setValue={setPayload}
                    name={"phone"}
                />
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
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
                            onClick={() => {
                                setRegister(false);
                                setPayload({ name: "", phone: "", password: "" });
                                invalidFields.length > 0 && setInvalidFields([]);
                            }}
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
                            onClick={() => {
                                setRegister(false);
                                setPayload({ name: "", phone: "", password: "" });
                                invalidFields.length > 0 && setInvalidFields([]);
                            }}
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
