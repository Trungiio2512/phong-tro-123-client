import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { InputForm, Button } from "../../components";
import * as actions from "../../store/actions";
import { path } from "../../untils/constant";
import { phone, password, name, type } from "../../untils/yup_schema";
import { apiRegister } from "../../services/auth";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            password: "",
            type: "",
        },
        validationSchema: Yup.object({
            phone,
            name,
            password,
            type,
        }),
        onSubmit: async (values) => {
            // console.log(values);
            const res = await apiRegister(values);
            if (res.err === 0) {
                Swal.fire("Đăng ký thành công", res.msg, "success").then(() => {
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
            <h1 className="font-semibold text-3xl">Đăng ký</h1>
            <div className="w-full flex flex-col mt-5 gap-5">
                <InputForm
                    label="Tên đăng nhập"
                    value={formik.values.name}
                    setValue={formik.handleChange}
                    name={"name"}
                    error={formik.errors?.name}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.name}
                />
                <InputForm
                    label="Số điện thoại"
                    value={formik.values.phone}
                    setValue={formik.handleChange}
                    name={"phone"}
                    onBlur={formik.handleBlur}
                    error={formik.errors?.phone}
                    touched={formik.touched.phone}
                />
                <InputForm
                    label="Mật khẩu"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    setValue={formik.handleChange}
                    name={"password"}
                    type="password"
                    touched={formik.touched.password}
                    error={formik.errors?.password}
                />
                <div className="w-full">
                    {/* <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >Lựa</label> */}
                    <select
                        id="type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={formik.handleChange}
                        value={formik.values.type}
                        // onTouchStart={formik.touched.type}
                    >
                        <option value="">Chọn loại tài khoản</option>
                        <option value="R3">Tìm kiếm</option>
                        <option value="R2">Đăng tin</option>
                    </select>
                    {formik.touched.type && formik.errors.type ? (
                        <small className="italic text-red-400">{formik.errors.type}</small>
                    ) : null}
                </div>
            </div>
            <div className="mt-5">
                <Button
                    text={"Đăng nhập"}
                    textColor="text-white"
                    bgColor={"bg-secondary1"}
                    fullWidth
                    type="submit"
                    onClick={formik.handleSubmit}
                />
            </div>
            <div className="w-full flex items-center justify-between mt-[30px]">
                <small
                    onClick={() => {
                        navigate(`/${path.LOGIN}`);
                    }}
                    className="text-sm text-blue-500 hover:text-red-500 cursor-pointer"
                >
                    Bạn đã có tài khoản
                </small>
                <small className="text-sm text-blue-500 hover:text-red-500 cursor-pointer">
                    Bạn quên mật khẩu
                </small>
            </div>
        </div>
    );
}

export default Register;
