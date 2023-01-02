import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import icons from "../untils/icons";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../untils/common/fn";
const indexs = [0, 1, 2, 3];
const { BsFillHeartFill, GrStar, BsHeart, BsFillBookmarkStarFill } = icons;

const Item = ({ id, title, address, attributes, description, images, star, user }) => {
    const [isHoverHeart, setisHoverHeart] = useState(false);
    const [stars, setstars] = useState(() => {
        const stars = [];
        for (let i = 0; i < star; i++) {
            stars.push(<GrStar size={20} className=" star-item text-yellow-400 shrink-0" />);
        }
        return stars;
    });

    return (
        <div className="w-full flex border-t-1 border-t-red-500 py-4">
            <Link
                to={`detail/${formatVietnameseToString(title)}/${id}`}
                className="relative shrink-0 w-[280px] h-[240px] rounded-md overflow-hidden"
            >
                {images.length > 0 && (
                    <>
                        <img
                            src={images[0]}
                            alt="preview"
                            className="w-full h-full object-cover border border-gray-300"
                        />
                        <span className="bg-overlay-50 text-white p-1 text-xs rounded-md absolute bottom-1 left-2">
                            {images.length} ảnh
                        </span>
                    </>
                )}
                <span
                    className="absolute bottom-1 right-2"
                    onMouseEnter={() => setisHoverHeart(true)}
                    onMouseLeave={() => setisHoverHeart(false)}
                >
                    {!isHoverHeart ? (
                        <BsHeart size={20} className="text-gray-500" />
                    ) : (
                        <BsFillHeartFill size={20} className="text-pink-600" />
                    )}
                </span>
            </Link>
            <div className="flex flex-col gap-3 ml-3">
                <div className="flex items-start justify-between">
                    <Link
                        to={"/"}
                        className="gap-2 text-red-600 uppercase font-semibold hover:cursor-pointer hover:underline line-clamp-2"
                    >
                        {stars.map((i, index) => (
                            <span key={index}>{i}</span>
                        ))}
                        {title}
                    </Link>
                    {star > 4 && (
                        <div className="w-[10%] flex items-center">
                            {" "}
                            <BsFillBookmarkStarFill
                                size={24}
                                className="text-yellow-600 shrink-0"
                            />
                        </div>
                    )}
                </div>
                <div className=" flex items-baseline justify-between gap-2">
                    <strong className="text-green-500 text-lg text-ellipsis whitespace-nowrap overflow-hidden">
                        {attributes?.price}
                    </strong>
                    <span className="text-sm text-gray-500">{attributes?.acreage}</span>
                    <Link
                        to={"/"}
                        className="hover:underline text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[250px]"
                    >
                        {address.split(",").slice(-2, address.length).join("-")}
                    </Link>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3">{description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/05/23/anh-2-1-590x308_1653278194.jpg"
                            alt="avatar"
                            className="w-[30px] h-[30px] object-cover rounded-full"
                        />
                        <span className="ml-2 text-sm text-gray-400">{user?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="py-[2px] px-1 text-sm bg-blue-700  outline outline-1 outline-blue-700  text-white rounded-md select-none">
                            Gọi {user?.zalo}
                        </button>
                        <button className="py-[2px] px-1 text-sm bg-white text-blue-700 outline outline-1 outline-blue-700 rounded-md select-none">
                            Nhắn zalo
                        </button>
                    </div>
                </div>
                <span className="float-right text-sm text-gray-400">{attributes?.published}</span>
            </div>
        </div>
    );
};
// title, address, attributes, description, images, star, user
Item.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    attributes: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    star: PropTypes.number,
    user: PropTypes.objectOf(PropTypes.string),
};

export default memo(Item);
