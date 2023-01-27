import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { formatVietnameseToString } from "../untils/common/fn";
import { Link } from "react-router-dom";
import icons from "../untils/icons";
import imageUserDefaults from "../assests/img_user_default_nobg.png";
import { base64Tofile } from "../untils/common/base64";
import { path } from "../untils/constant";
import SkeletonCutom from "./SkeletonCutom";
const indexs = [0, 1, 2, 3];
const { BsFillHeartFill, GrStar, BsHeart, BsFillBookmarkStarFill } = icons;

const Item = ({
    id,
    title,
    address,
    attributes,
    description,
    images,
    star,
    user,
    loading,
    categoryCode,
}) => {
    const [isHoverHeart, setisHoverHeart] = useState(false);
    const [stars, setstars] = useState(() => {
        const stars = [];
        for (let i = 0; i < star; i++) {
            stars.push(<GrStar size={20} className=" star-item text-yellow-400 shrink-0" />);
        }
        return stars;
    });
    // console.log(images);
    const linkDetailPost = (id) => {
        return !loading && `${path.DETAIL}/${formatVietnameseToString(title)}/${id}`;
    };
    return (
        <div className="w-full flex border-t-1 border-t-red-500 py-4">
            <div className="relative shrink-0 w-[280px] h-[240px] rounded-md overflow-hidden">
                {loading ? (
                    <SkeletonCutom className={"h-full"} />
                ) : (
                    images?.length > 0 && (
                        <>
                            <Link to={linkDetailPost(id)} state={{ id: id }}>
                                <figure className="w-full h-full">
                                    <img
                                        src={images[0]}
                                        alt="preview"
                                        className="w-full h-full object-cover border border-gray-300"
                                    />
                                </figure>
                            </Link>
                            <span className="bg-overlay-50 text-white p-1 text-xs rounded-md absolute bottom-1 left-2">
                                {images.length} ảnh
                            </span>
                        </>
                    )
                )}
                {!loading && (
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
                )}
            </div>
            <div className="flex flex-col gap-3 ml-3 flex-1 relative">
                <div className="">
                    {loading ? (
                        <SkeletonCutom count={2} />
                    ) : (
                        <Link
                            to={linkDetailPost(id)}
                            state={{ id: id, categoryCode }}
                            className="gap-2 text-red-600 uppercase font-semibold hover:cursor-pointer hover:underline line-clamp-2"
                        >
                            {stars.map((i, index) => (
                                <span key={index}>{i}</span>
                            ))}
                            {title}
                        </Link>
                    )}
                    {!loading && star > 4 && (
                        <div className="w-[10%] flex items-center absolute top-0 right-[-20px]">
                            {" "}
                            <BsFillBookmarkStarFill
                                size={24}
                                className="text-yellow-600 shrink-0"
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-baseline justify-between">
                    <strong className="text-green-500 text-lg text-ellipsis whitespace-nowrap overflow-hidden inline-block">
                        {loading ? <SkeletonCutom className={"min-w-100"} /> : attributes?.price}
                    </strong>
                    <span className="text-sm text-gray-500">
                        {loading ? <SkeletonCutom className={"min-w-100"} /> : attributes?.acreage}
                    </span>
                    {loading ? (
                        <SkeletonCutom className={"min-w-100"} />
                    ) : (
                        <Link
                            to={"/"}
                            className="hover:underline text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[250px]"
                        >
                            {address.split(",").slice(-2, address.length).join("-")}
                        </Link>
                    )}
                </div>
                <p className="text-sm text-gray-400 line-clamp-3">
                    {loading ? <SkeletonCutom height={60} /> : description}
                </p>
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center gap-2 flex-1">
                        <figure className="w-[30px] h-[30px] overflow-hidden rounded-full">
                            {loading ? (
                                <SkeletonCutom circle height="100%" />
                            ) : (
                                <img
                                    src={base64Tofile(user?.avatar) || imageUserDefaults}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </figure>
                        <span className="text-sm text-gray-400 flex-1">
                            {loading ? <SkeletonCutom count={1} /> : user?.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {loading ? (
                            <SkeletonCutom className={"min-w-100"} />
                        ) : (
                            <button className="py-[2px] px-1 text-sm bg-blue-700  outline outline-1 outline-blue-700 text-white rounded-md select-none">
                                Gọi {user?.zalo || user?.phone}
                            </button>
                        )}
                        {loading ? (
                            <SkeletonCutom className={"min-w-100"} />
                        ) : (
                            <button className="py-[2px] px-1 text-sm bg-white text-blue-700 outline outline-1 outline-blue-700 rounded-md select-none">
                                Nhắn zalo
                            </button>
                        )}
                    </div>
                </div>
                <span className="float-right text-sm text-gray-400">
                    {loading ? <SkeletonCutom /> : attributes?.published}
                </span>
            </div>
        </div>
    );
};
// title, address, attributes, description, images, star, user
Item.propTypes = {
    title: PropTypes.string,
    address: PropTypes.string,
    attributes: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.any,
    images: PropTypes.arrayOf(PropTypes.string),
    star: PropTypes.number,
    // user: PropTypes.objectOf(PropTypes.string),
};

export default Item;
