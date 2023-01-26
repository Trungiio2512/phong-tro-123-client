import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import InputReadOnly from "../System/components/InputReadOnly";
import InputFormV2 from "./components/InputFormV2";
import imgUserDefault from "../../assests/img_user_default_nobg.png";
import { Button } from "../../components";
import { apiUploadImages } from "../../services/post";
import { apiUpdateUser } from "../../services/user";
import * as actions from "../../store/actions";

import { fileToBase64, base64Tofile } from "../../untils/common/base64";

const UserInfo = (props) => {
    const dispatch = useDispatch();
    const { currentData } = useSelector((state) => state.user);
    // console.log(currentData);
    // const [invalidfields, setinvalidfields] = useState([]);
    // const [laodingImage, setloadingImage] = useState(false);
    const [payload, setpayload] = useState({
        name: currentData?.name || "",
        zalo: currentData?.zalo || "",
        fbUrl: currentData?.fbUrl || "",
        avatar: base64Tofile(currentData?.avatar) || imgUserDefault,
    });
    const handleChangeAvatar = async (e) => {
        const image64 = await fileToBase64(e.target.files[0]);
        setpayload((prev) => ({
            ...prev,
            avatar: image64,
        }));
    };

    const handleSubmit = async () => {
        console.log(payload);
        const res = await apiUpdateUser(payload);
        if (res.err === 0) {
            Swal.fire("Thành công", "Sửa thông tin thành công", "success").then(() => {
                dispatch(actions.getCurrentUser());
            });
        } else {
            Swal.fire("Thất bại", "Có vấn đề gì đó", "error");
        }
    };
    return (
        <div className="px-8 h-full mb-10">
            <div className="flex items-center justify-between border-b-1 border-gray-300">
                <h1 className="font-semibold text-3xl py-4 ">Cập nhật thông tin cá nhân</h1>
            </div>
            <div className="flex flex-col gap-6 max-w-[700px] m-auto mt-6">
                <InputReadOnly row label="Mã thành viên" value={currentData?.id || ""} />
                <InputReadOnly
                    row
                    label="Số điện thoại"
                    value={currentData?.phone}
                    small="Đổi số điện thoại"
                />
                <InputFormV2
                    row
                    setValue={setpayload}
                    // invalidFields={invalidfields}
                    // setinvalidFields={setinvalidfields}
                    label="Tên hiển thị"
                    value={payload.name}
                    name="name"
                />

                <InputFormV2
                    row
                    // setValue={setpayload}
                    // invalidFields={invalidfields}
                    // setinvalidFields={setinvalidfields}
                    label="Zalo"
                    value={payload.zalo}
                    name="zalo"
                />
                <InputFormV2
                    row
                    setValue={setpayload}
                    // invalidFields={invalidfields}
                    // setinvalidFields={setinvalidfields}
                    label="Facebook"
                    name="fbUrl"
                    value={payload.fbUrl}
                />
                <div className="flex items-center">
                    <label htmlFor="avatar" className="min-w-200">
                        Ảnh đại diện
                    </label>
                    <figure className="rounded-full w-40 h-40 border border-gray-300 overflow-hidden">
                        <img
                            src={payload.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    </figure>
                </div>

                <input
                    className="ml-200"
                    type="file"
                    onChange={(e) => handleChangeAvatar(e)}
                    id="avatar"
                />
                <div className="flex items-center ">
                    <label className="min-w-200">Mật khẩu</label>
                    <span className="text-md text-blue-500">Dổi mật khẩu</span>
                </div>
                <Button
                    fullWidth
                    text="Cập nhật"
                    textColor="text-white"
                    bgColor="bg-blue-500"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

UserInfo.propTypes = {};

export default UserInfo;
