import React, { memo } from "react";
import PropTypes from "prop-types";
import { InputFormV2, InputReadOnly, Select } from "../components";
import { useSelector } from "react-redux";

const targets = [
    {
        code: "male",
        value: "Nam",
    },
    {
        code: "female",
        value: "Nữ",
    },
];

const OverView = (props) => {
    const { categories } = useSelector((state) => state.app);
    const { currentData } = useSelector((state) => state.user);
    console.log(categories);
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Thông tin mô tả</h2>
            <div className="w-full flex flex-col gap-4">
                <div className="w-1/2">
                    <Select label="Loại chuyên mục" options={categories} type="category" />
                </div>
                <InputFormV2 label="Tiêu đề" />
                <div className="flex flex-col">
                    <label htmlFor="desc">Nội dung mô tả</label>
                    <textarea
                        id="desc"
                        className="w-full p-2 outline-none border border-gray-300 rounded-md bg-gray-100"
                        cols={"8"}
                        rows={"10"}
                    ></textarea>
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                    <InputReadOnly label="Thông tin liên hệ" value={currentData?.name || ""} />
                    <InputReadOnly label="Điện thoại" value={currentData?.phone} />
                    <InputFormV2 label="Giá cho thuê" unit="đồng" />
                    <InputFormV2 label="Diện tích" unit={"m2"} />{" "}
                    <Select options={targets} label="Đối tượng cho thuê" />
                </div>
            </div>
        </div>
    );
};

OverView.propTypes = {};

export default memo(OverView);
