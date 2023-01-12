import React, { memo } from "react";
import PropTypes from "prop-types";
import { InputFormV2, InputReadOnly, Select } from "../components";
import { useSelector } from "react-redux";

const targets = [
    {
        code: "Nam",
        value: "Nam",
    },
    {
        code: "Nữ",
        value: "Nữ",
    },
];

const OverView = ({ payload, setpayload }) => {
    const { categories } = useSelector((state) => state.app);
    const { currentData } = useSelector((state) => state.user);
    // console.log(categories);
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Thông tin mô tả</h2>
            <div className="w-full flex flex-col gap-4">
                <div className="w-1/2">
                    <Select
                        label="Loại chuyên mục"
                        options={categories}
                        type="category"
                        value={payload?.categoryCode}
                        setValue={setpayload}
                        name="categoryCode"
                    />
                </div>
                <InputFormV2
                    label="Tiêu đề"
                    name="title"
                    value={payload?.title}
                    setValue={setpayload}
                />
                <div className="flex flex-col">
                    <label htmlFor="desc">Nội dung mô tả</label>
                    <textarea
                        id="desc"
                        className="w-full p-2 outline-none border border-gray-300 rounded-md bg-gray-100"
                        cols={"8"}
                        rows={"10"}
                        value={payload.description}
                        onChange={(e) =>
                            setpayload((prev) => ({ ...prev, description: e.target.value }))
                        }
                    ></textarea>
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                    <InputReadOnly label="Thông tin liên hệ" value={currentData?.name || ""} />
                    <InputReadOnly label="Điện thoại" value={currentData?.phone} />
                    <InputFormV2
                        label="Giá cho thuê"
                        unit="đồng"
                        small="Nhập đầy đủ số, vú dụ 1 triệu thì nhập là 1000000"
                        name="priceNumber"
                        value={payload?.priceNumber}
                        setValue={setpayload}
                        // error ={payload?.priceNumber }
                    />
                    <InputFormV2
                        label="Diện tích"
                        unit={"m2"}
                        name="areaNumber"
                        value={payload?.areaNumber}
                        setValue={setpayload}
                    />{" "}
                    <Select
                        label="Đối tượng cho thuê"
                        options={targets}
                        name="target"
                        value={payload?.target}
                        setValue={setpayload}
                    />
                </div>
            </div>
        </div>
    );
};

OverView.propTypes = {};

export default memo(OverView);
