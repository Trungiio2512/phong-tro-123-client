import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import moment from "moment";
import { Row, Col } from "antd";

import { getCodesAreasNeedFind, getCodesPricesNeedFind } from "../../untils/common/getCodes";
import { apiUploadImages, apiCreateNewPost, apiUpdatePostPrivate } from "../../services/post";
import { Button, LoadingCircle } from "../../components";
import { Address, OverView } from "./components";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../untils/icons";
import validate from "../../untils/validate";
import { useLocation } from "react-router-dom";
import * as actions from "../../store/actions";
import { formatDate, formatDateDefault } from "../../untils/common/formatDefaultDate";

const { BsFillCameraFill, FaTimesCircle } = icons;
const warnnings = [
  { id: 1, text: "Nội dung phải viết bằng tiếng Việt có dấu" },
  { id: 2, text: "Tiêu đề tin không dài quá 100 kí tự" },
  { id: 3, text: "Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn." },
  {
    id: 4,
    text: "Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.",
  },
  {
    id: 5,
    text: "Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!",
  },
];

const CreatePost = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isEdit = location.state?.isEdit ? location.state?.isEdit : false;
  const { post } = useSelector((state) => state.user);
  const { prices, areas, categories } = useSelector((state) => state.app);

  const [previewImages, setpreviewImages] = useState(() => {
    return isEdit ? JSON.parse(post?.imagesData?.images) : [];
  });

  const [loading, setloading] = useState(false);
  const [payload, setpayload] = useState({
    categoryCode: isEdit ? post?.categoryCode : "",
    title: isEdit ? post?.title : "",
    priceNumber: isEdit ? +post?.priceNumber * Math.pow(10, 6) : 0,
    areaNumber: isEdit ? +post?.areaNumber : 0,
    address: isEdit ? post?.address : "",
    description: isEdit ? JSON.parse(post?.description) : "",
    target: isEdit ? post?.overviews?.target : "",
    province: isEdit ? post?.province : "",
    expired: isEdit ? formatDateDefault(post?.overviews?.expired) : "",
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
  console.log("render");
  // console.log(formatDateDefault(post?.overviews?.expired));
  const handleDeleteImage = (image) => {
    setpreviewImages((prev) => prev.filter((item, index) => item !== image));
  };
  const handleSubmit = async () => {
    const today = isEdit ? formatDateDefault(post?.overviews?.created) : new Date().toDateString();
    const resultValidate = validate(payload, setinvalidFields, today);
    if (resultValidate === 0) {
      const price = getCodesPricesNeedFind(prices, +payload?.priceNumber / Math.pow(10, 6), 1, 15);
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
      // console.log(formatDate(new Date(payload.expired)));
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
  useEffect(() => {
    if (isEdit) {
      setpayload({
        categoryCode: post?.categoryCode,
        title: post?.title,
        priceNumber: +post?.priceNumber * Math.pow(10, 6),
        areaNumber: +post?.areaNumber,
        address: post?.address,
        description: JSON.parse(post?.description),
        target: post?.overviews?.target,
        province: post?.province,
        expired: formatDateDefault(post?.overviews?.expired),
      });
      setpreviewImages(JSON.parse(post?.imagesData?.images));
    } else {
      setpayload({
        categoryCode: "",
        title: "",
        priceNumber: 0,
        areaNumber: 0,
        address: "",
        description: "",
        target: "",
        province: "",
        expired: "",
      });
      setpreviewImages([]);
    }
  }, [isEdit]);
  // console.log(formatDateDefault(post?.overviews?.expired));
  return (
    <div className={`px-8 min-h-screen`}>
      <h1 className="font-semibold text-3xl py-4 mb-5 border-b-1 border-gray-300">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <Row gutter={24}>
        <Col sm={24} md={24} lg={16} className="flex flex-auto flex-col gap-8 ">
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
              <input type="file" name="file" id="file" hidden multiple onChange={handleFiles} />
            </div>
            {previewImages.length > 0 && (
              <div className="flex md:items-center md:flex-row w-full overflow-y-scroll  flex-col md:max-w-[620px]  md:h-auto h-[500px] mb-8 gap-2 md:overflow-auto">
                {previewImages.map((image, index) => {
                  return (
                    <figure className="md:w-200 h-200 border border-gray-300 relative" key={image}>
                      <img className="w-full h-full object-contain" src={image} alt={image} />
                      <button
                        className="absolute top-0 right-0 z-10 "
                        title="Xoá"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <FaTimesCircle size={22} className="hover:text-red-500" />
                      </button>
                    </figure>
                  );
                })}
              </div>
            )}
            <Button
              text={isEdit ? "Thay đổi" : "Tạo mới"}
              bgColor={"bg-green-400"}
              textColor="text-white"
              onClick={handleSubmit}
              fullWidth
            />
          </div>
        </Col>
        <Col sm={24} md={24} lg={8}>
          <div className="p-4 bg-[#fff3cd] rounded-md shadow-md w-full mt-5 lg:mt-0 text-[#856404]">
            <h4 className="text-lg capitalize text-left font-semibold">
              Lưu ý khi đăng hoặc sửa tin
            </h4>
            <ul className="w-full list-item">
              {warnnings.map((item) => {
                return (
                  <li key={item.id} className="text-left text-sm list-disc list-inside px-2 py-1 ">
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

CreatePost.propTypes = {};

export default memo(CreatePost);
