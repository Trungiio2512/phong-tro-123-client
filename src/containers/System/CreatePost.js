import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { getCodesAreasNeedFind, getCodesPricesNeedFind } from "../../untils/common/getCodes";
import { apiUploadImages, apiCreateNewPost } from "../../services/post";
import { Button, LoadingCircle } from "../../components";
import { Address, OverView } from "./components";
import { useSelector } from "react-redux";
import icons from "../../untils/icons";
const { BsFillCameraFill, FaTimesCircle } = icons;

const CreatePost = (props) => {
    const { prices, areas, categories, provinces } = useSelector((state) => state.app);

    const [previewImages, setpreviewImages] = useState([]);
    const [loading, setloading] = useState(false);
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
        target: "",
        province: "",
    });

    const handleFiles = async (e) => {
        e.stopPropagation();
        const files = e.target.files;
        setloading(true);
        const formData = new FormData();
        let images = [];
        for (let file of files) {
            formData.append("file", file);
            formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);

            const response = await apiUploadImages(formData);
            images = [
                ...images,
                {
                    secure_url: response?.secure_url,
                    asset_id: response?.asset_id,
                    name: response?.original_filename,
                },
            ];
            // console.log(response);
        }
        setloading(false);
        setpreviewImages((prev) => [...prev, ...images]);
    };

    const handleDeleteImage = (id) => {
        setpreviewImages((prev) => prev.filter((item) => item?.asset_id !== id));
    };

    useEffect(() => {
        previewImages.length > 0
            ? setpayload((prev) => ({
                  ...prev,
                  images: [...previewImages.map((item) => item?.secure_url)],
              }))
            : setpayload((prev) => ({
                  ...prev,
                  images: [],
              }));
    }, [previewImages]);

    const handleSubmit = async () => {
        const price = getCodesPricesNeedFind(
            prices,
            +payload?.priceNumber / Math.pow(10, 6),
            1,
            15,
        );
        const area = getCodesAreasNeedFind(areas, +payload?.areaNumber, 0, 90);
        const finalPayLoad = {
            ...payload,
            priceCode: price?.code,
            areaCode: area?.code,
            priceNumber: +payload?.priceNumber / Math.pow(10, 6),
            areaNumber: +payload?.areaNumber,
            target: payload?.target || "Tất cả",
            label: `${categories.find((item) => item.code === payload.categoryCode)?.value} ${
                payload?.address.split(",").length > 2
                    ? payload?.address.split(",")[1]
                    : payload?.address.split(",")[0]
            }`,
        };

        const res = await apiCreateNewPost(finalPayLoad);
        if (res.err === 0) {
            Swal.fire("Thành công ", "Đã thêm bài mới", "success").then(() => {
                setpayload({
                    categoryCode: "",
                    title: "",
                    priceNumber: 0,
                    areaNumber: 0,
                    images: "",
                    address: "",
                    priceCode: "",
                    areaCode: "",
                    description: "",
                    target: "",
                    province: "",
                });
            });
        } else {
            Swal.fire("Thất bại", "Có lỗi", "error");
        }
    };

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
                                {loading ? (
                                    <LoadingCircle />
                                ) : (
                                    <>
                                        <BsFillCameraFill size={50} />
                                        <span>Thêm ảnh</span>
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                hidden
                                multiple
                                onChange={handleFiles}
                            />
                        </div>
                        {previewImages.length > 0 && (
                            <div className="max-w-[620px] w-full flex items-center gap-2 overflow-x-scroll ">
                                {previewImages.map((image) => {
                                    return (
                                        <figure
                                            className="w-[200px] h-[200px] border border-gray-300 relative"
                                            key={image?.asset_id}
                                        >
                                            <img
                                                className="w-full h-full object-contain"
                                                src={image?.secure_url}
                                                alt={image?.name}
                                            />
                                            <button
                                                className="absolute top-0 right-0 z-10 "
                                                title="Xoá"
                                                onClick={() => handleDeleteImage(image?.asset_id)}
                                            >
                                                <FaTimesCircle
                                                    size={22}
                                                    className="hover:text-red-500"
                                                />
                                            </button>
                                        </figure>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <Button
                        text="Tạo mới"
                        bgColor={"bg-green-400"}
                        textColor="text-white"
                        onClick={handleSubmit}
                    />
                    <div className="h-[500px]"></div>
                </div>

                <div className="w-[40%]">Map</div>
            </div>
        </div>
    );
};

CreatePost.propTypes = {};

export default CreatePost;
