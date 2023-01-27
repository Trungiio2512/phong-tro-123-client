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
import { apiLogin } from "../../services/auth";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            phone: "",
            password: "",
        },
        validationSchema: Yup.object({
            phone,
            password,
        }),
        onSubmit: async (values) => {
            // dispatch(actions.login(values));
            const res = await apiLogin(values);
            if (res.err === 0) {
                Swal.fire("Đăng nhập thành công", res.msg, "success").then(() => {
                    formik.handleReset();
                    dispatch(
                        actions.login({
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken,
                        }),
                    );
                    navigate(path.HOME);
                });
            } else if (res.err === 2) {
                Swal.fire("Có vấn đề về tài khoản của bạn", res.msg, "error");
            }
        },
    });

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
