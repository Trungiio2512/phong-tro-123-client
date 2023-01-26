import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { InputForm, Button } from "../../components";
import * as actions from "../../store/actions";
import { path } from "../../untils/constant";
import { phone, password } from "../../untils/yup_schema";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLogging, msg } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            phone: "",
            password: "",
        },
        validationSchema: Yup.object({
            phone,
            password,
        }),
        onSubmit: (values) => {
            Swal.fire("Thành công", "Đăng nhập thành công", "success").then(() => {
                dispatch(actions.login(values));
                formik.handleReset();
                navigate("/");
            });
        },
    });

    useEffect(() => {
        msg && Swal.fire("Ooopps !", msg, "error");
    }, [msg]);
    // console.log(formik.errors);
    return (
        <div className="bg-white w-full max-w-600 pt-[30px] px-[30px] pb-[100px] rounded-md border-1 border-stone-300 m-auto">
            <h1 className="font-semibold text-3xl">Đăng nhập</h1>
            <div className="w-full flex flex-col mt-5">
                <InputForm
                    label="Số điện thoại"
                    value={formik.values.phone}
                    setValue={formik.handleChange}
                    name={"phone"}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.phone}
                    error={formik.errors?.phone}
                />
                <InputForm
                    label="Mật khẩu"
                    value={formik.values.password}
                    setValue={formik.handleChange}
                    name={"password"}
                    type="password"
                    touched={formik.touched.password}
                    onBlur={formik.handleBlur}
                    error={formik.errors?.password}
                />
            </div>
            <div className="mt-5">
                <Button
                    text={"Đăng nhập"}
                    textColor="text-white"
                    bgColor={"bg-secondary1"}
                    fullWidth
                    type="submit"
                    onClick={() => formik.handleSubmit()}
                />
            </div>
            <div className="w-full flex items-center justify-between mt-[30px]">
                <small className="text-sm text-blue-500 hover:text-red-500 cursor-pointer">
                    Bạn quên mật khẩu
                </small>
                <small
                    onClick={() => {
                        navigate(`/${path.REGISTER}`);
                    }}
                    className="text-sm text-blue-500 hover:text-red-500 cursor-pointer"
                >
                    Tạo tài khoản mới
                </small>
            </div>
        </div>
    );
}

export default Login;
