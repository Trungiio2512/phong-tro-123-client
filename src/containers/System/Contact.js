import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { phone, name, textContent } from "../../untils/yup_schema";

import { Button, InputForm } from "../../components";

const Contact = (props) => {
    const formik = useFormik({
        initialValues: {
            phone: "",
            name: "",
            textContent: "",
        },
        validationSchema: Yup.object({
            phone,
            name,
            textContent,
        }),
        onSubmit: (values) => {
            // console.log(values);
            // dispatch(actions.login(values));
            Swal.fire(
                "Thành công",
                "Bạn đã gửi tin nhắn thành công, chờ phản hồi từ admin",
                "success",
            ).then(() => {
                formik.handleReset();
            });
        },
    });
    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold">Liên hệ với chúng tôi</h1>
            <div className="flex gap-4 mt-4">
                <div className="flex flex-col bg-blue-rb rounded-2xl text-white flex-1 p-7 gap-4">
                    <h5 className="font-medium text-xl">Thông tin liên hệ</h5>
                    <p className="font-normal">
                        Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn
                        PhongTro123.Com
                    </p>
                    <p className="flex items-center">
                        <strong className="min-w-100">Điện thoại :</strong>
                        <span>0388213419</span>
                    </p>
                    <p className="flex items-center">
                        <strong className="min-w-100">Email :</strong>
                        <span>snakecaplia@gmail.com</span>
                    </p>
                    <p className="flex items-center">
                        <strong className="min-w-100">Zalo :</strong>
                        <span>0388213419</span>
                    </p>
                    <p className="flex items-center">
                        <strong className="min-w-100">Địa chỉ :</strong>
                        <span>Ngã 4, Nhầ cao tầng, Màu xanh cửa gỗ</span>
                    </p>
                </div>
                <div className="flex-1 p-7 rounded-md border border-gray-300 ">
                    {" "}
                    <h5 className="font-medium text-xl">Liên hệ trực tuyến</h5>
                    <div className="flex flex-col gap-4">
                        <InputForm
                            label="Họ tên của bạn"
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            name="name"
                            setValue={formik.handleChange}
                            touched={formik.touched.name}
                            error={formik.errors?.name}
                        />
                        <InputForm
                            label="Số điện thoại"
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            name="phone"
                            setValue={formik.handleChange}
                            touched={formik.touched.phone}
                            error={formik.errors?.phone}
                        />
                        <InputForm
                            label="Nội dung"
                            onBlur={formik.handleBlur}
                            name="textContent"
                            value={formik.values.textContent}
                            touched={formik.touched.textContent}
                            error={formik.errors?.textContent}
                            setValue={formik.handleChange}
                        />
                        <Button
                            text="Gửi liên hệ"
                            fullWidth
                            type={"submit"}
                            onClick={() => formik.handleSubmit()}
                            bgColor={"bg-blue-600"}
                            textColor="text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Contact.propTypes = {};

export default Contact;
