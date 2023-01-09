import React, { useState } from "react";
import PropTypes from "prop-types";
import { Address, OverView } from "./components";
import icons from "../../untils/icons";

const { BsFillCameraFill } = icons;
const CreatePost = (props) => {
    const [payload, setpayload] = useState({
        categoryCode: "",
        title: "",
        priceNumber: 0,
        areaNumber: 0,
        images: "",
        address: "",
        priceCode: "",
        areaCode: "",
        description: "",
        tagert: "",
        province: "",
    });
    console.log(payload);

    return (
        <div className="px-8 h-full ">
            <h1 className="font-semibold text-3xl py-4 border-b-1 border-gray-300">Đăng tin mới</h1>
            <div className="flex gap-4">
                <div className="flex flex-auto flex-col gap-8">
                    <Address payload={payload} setpayload={setpayload} />
                    <OverView payload={payload} setpayload={setpayload} />
                    <div className="w-full">
                        <h2 className="font-semibold text-xl border-gray-300">Hình ảnh</h2>
                        <small>Cập nhật hình ảnh dễ đàng sẽ cho thuê nhanh hơn</small>
                        <div className="w-full my-4">
                            <label
                                htmlFor="file"
                                className="w-full flex flex-col gap-2 text-blue-400 items-center justify-center h-[200px] border-2 border-gray-400 border-dashed rounded-md"
                            >
                                <BsFillCameraFill size={50} />
                                <span>Thêm ảnh</span>
                            </label>
                            <input type="file" name="file" id="file" hidden />
                        </div>
                    </div>
                    <div className="h-[500px]"></div>
                </div>

                <div className="w-[40%]">Map</div>
            </div>
        </div>
    );
};

CreatePost.propTypes = {};

export default CreatePost;
