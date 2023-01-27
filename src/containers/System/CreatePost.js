import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import moment from "moment";

import { getCodesAreasNeedFind, getCodesPricesNeedFind } from "../../untils/common/getCodes";
import { apiUploadImages, apiCreateNewPost, apiUpdatePostPrivate } from "../../services/post";
import { Button, LoadingCircle } from "../../components";
import { Address, OverView } from "./components";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../untils/icons";
import validate from "../../untils/validate";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { formatDate, formatDateDefault } from "../../untils/common/formatDefaultDate";

const { BsFillCameraFill, FaTimesCircle } = icons;

const CreatePost = ({ isEdit = false, setisEdit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.user);
    const { prices, areas, categories, provinces } = useSelector((state) => state.app);

    const [previewImages, setpreviewImages] = useState(() => {
        return isEdit ? JSON.parse(post?.imagesData?.images) : [];
    });
    const [loading, setloading] = useState(false);
    const [payload, setpayload] = useState(() => {
        const value = {
            categoryCode: isEdit ? post?.categoryCode : "",
            title: isEdit ? post?.title : "",
            priceNumber: isEdit ? +post?.priceNumber * Math.pow(10, 6) : 0,
            areaNumber: isEdit ? +post?.areaNumber : 0,
            address: isEdit ? post?.address : "",
            // priceCode: "",
            // areaCode: "",
            description: isEdit ? JSON.parse(post?.description) : "",
            target: isEdit ? post?.overviews?.target : "",
            province: isEdit ? post?.province : "",
            expired: isEdit ? formatDateDefault(post?.overviews?.expired) : "",
        };
        return value;
    });

    // formatDate(post?.overviews?.created);
    const [invalidFields, setinvalidFields] = useState([]);
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
            images = [...images, response?.secure_url];
            // console.log(response);
        }
        setloading(false);
        setpreviewImages((prev) => [...prev, ...images]);
    };

    const handleDeleteImage = (image) => {
        setpreviewImages((prev) => prev.filter((item, index) => item !== image));
    };
    const handleSubmit = async () => {
        const today = isEdit
            ? formatDateDefault(post?.overviews?.created)
            : new Date().toDateString();
        const resultValidate = validate(payload, setinvalidFields, today);
        if (resultValidate === 0) {
            const price = getCodesPricesNeedFind(
                prices,
                +payload?.priceNumber / Math.pow(10, 6),
                1,
                15,
            );
            const area = getCodesAreasNeedFind(areas, +payload?.areaNumber, 0, 90);
            // console.log(area);
            const finalPayLoad = {
                ...payload,
                priceCode: price?.code,
                areaCode: area?.code,
                images: previewImages,
                priceNumber: +payload?.priceNumber / Math.pow(10, 6),
                areaNumber: +payload?.areaNumber,
                target: payload?.target || "All",
                label: `${categories.find((item) => item.code === payload.categoryCode)?.value} ${
                    payload?.address.split(",").length > 2
                        ? payload?.address.split(",")[1]
                        : payload?.address.split(",")[0]
                }`,
                category: categories.find((item) => item.code === payload.categoryCode)?.value,
                expired: formatDate(new Date(payload.expired)),
            };
            if (isEdit && post) {
                // const expired = moment(date).toDate();

                finalPayLoad.postId = post.id;
                finalPayLoad.overviewId = post.overviewId;
                finalPayLoad.attributesId = post.attributesId;
                finalPayLoad.imagesId = post.imagesId;
                // console.log(post);
                // console.log(finalPayLoad);
                const res = await apiUpdatePostPrivate(finalPayLoad);
                if (res.err === 0) {
                    Swal.fire("Thành công ", "Thành công", "success").then(() => {
                        setisEdit(false);
                        dispatch(actions.setDefaultPostPriveate());
                    });
                } else {
                    Swal.fire("Thất bại", "Có lỗi", "error");
                }
            } else {
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
                            //   priceCode: "",
                            //   areaCode: "",
                            description: "",
                            target: "",
                            province: "",
                            expired: "",
                        });
                        setpreviewImages([]);
                    });
                } else {
                    Swal.fire("Thất bại", "Có lỗi", "error");
                }
            }
        }
    };
    // console.log(formatDateDefault(post?.overviews?.expired));
    return (
        <div className="px-8 h-full">
            <h1 className="font-semibold text-3xl py-4 border-b-1 border-gray-300">
                {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
            </h1>
            <div className="flex flex-auto flex-col gap-8">
                <Address
                    isEdit={isEdit}
                    payload={payload}
                    invalidFields={invalidFields}
                    setpayload={setpayload}
                    setinvalidFields={setinvalidFields}
                />
                <OverView
                    payload={payload}
                    setpayload={setpayload}
                    invalidFields={invalidFields}
                    setinvalidFields={setinvalidFields}
                    isEdit={isEdit}
                />
                {/* <input type="date" value={date} onChange={(e) => handleExpiredPost(e)} /> */}

                <div className="w-full">
                    <h2 className="font-semibold text-xl border-gray-300">Hình ảnh</h2>
                    <small>Cập nhật hình ảnh dễ đàng sẽ cho thuê nhanh hơn</small>
                    <div className="w-full my-4">
                        <label
                            htmlFor="file"
                            className="w-full flex flex-col gap-2 text-blue-400 items-center justify-center h-200 border-2 border-gray-400 border-dashed rounded-md"
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
                            {previewImages.map((image, index) => {
                                return (
                                    <figure
                                        className="w-200 h-200 border border-gray-300 relative"
                                        key={image}
                                    >
                                        <img
                                            className="w-full h-full object-contain"
                                            src={image}
                                            alt={image}
                                        />
                                        <button
                                            className="absolute top-0 right-0 z-10 "
                                            title="Xoá"
                                            onClick={() => handleDeleteImage(image)}
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
                    text={isEdit ? "Thay đổi" : "Tạo mới"}
                    bgColor={"bg-green-400"}
                    textColor="text-white"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

CreatePost.propTypes = {};

export default memo(CreatePost);
