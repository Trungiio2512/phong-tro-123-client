import React, { memo } from "react";
import PropTypes from "prop-types";
import icons from "../untils/icons";
import { Link } from "react-router-dom";
const images = [
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/04/09/z2424914262678-e1e1c884e5db156b42184146443f535c_1617942780.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/04/09/z2424914249891-7cb9b721f4dddc8b263f8105be4b073e_1617942774.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/04/09/z2424914252175-8054a25b3d6d793752360dc7654e94da_1617942774.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/04/09/z2424914256971-c568aa022fe302378274d38f7d8a8bc3_1617942777.jpg",
];
const { BsFillHeartFill, GrStar, BsHeart, BsFillBookmarkStarFill } = icons;

const Item = (props) => {
    return (
        <div className="w-full flex ">
            <div className="w-2/5 flex flex-wrap gap-[2px] items-center">
                <img src={images[0]} alt="preview" className="w-[140px] h-[120px] object-cover" />
                <img src={images[0]} alt="preview" className="w-[140px] h-[120px] object-cover" />
                <img src={images[0]} alt="preview" className="w-[140px] h-[120px] object-cover" />
                <img src={images[0]} alt="preview" className="w-[140px] h-[120px] object-cover" />
                {/* <div className="flex items-center gap-1">
                </div> */}
                {/* <div className="flex items-center gap-1">
                </div> */}
            </div>
            <div className="w-3/5 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                    <Link
                        to={"/"}
                        className="gap-2 text-red-600 uppercase font-semibold hover:cursor-pointer hover:underline "
                    >
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        CHO THUÊ NHÀ TRỌ CAO CẤP NHẬT QUANG 2
                    </Link>
                    <div className="w-[10%] flex items-center">
                        {" "}
                        <BsFillBookmarkStarFill size={24} className="text-yellow-600 shrink-0" />
                    </div>
                </div>
                <div className=" flex items-center justify-between">
                    <strong className="text-green-500 text-lg">3.1 triệu/tháng</strong>
                    <span className="text-sm text-gray-500">27m²</span>
                    <Link to={"/"} className="hover:underline text-sm text-gray-500">
                        Quận 2, Hồ Chí Minh
                    </Link>
                </div>
                <p className="text-sm text-gray-400">
                    Cách Mặt tiền Đường Nguyễn Duy Trinh 30m – Gần Nguyễn Thị Định Giao Với Nguyễn
                    Duy TrinhĐịa chỉ: Số 120 Đường số 6 phường Bình Trưng Tây Quận 2,…
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="	https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/05/23/anh-2-1-590x308_1653278194.jpg"
                            alt="avatar"
                            className="w-[30px] h-[30px] object-cover rounded-full"
                        />
                        <span className="ml-2">Tue thu</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-1 bg-blue-700  outline outline-1 outline-blue-700  text-white rounded-md">
                            Gọi 0989997054
                        </button>
                        <button className="p-1 bg-white text-blue-700 outline outline-1 outline-blue-700 rounded-md">
                            nhan zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Item.propTypes = {};

export default memo(Item);
