import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import icons from "../untils/icons";
import { Link } from "react-router-dom";
const indexs = [0, 1, 2, 3];
const { BsFillHeartFill, GrStar, BsHeart, BsFillBookmarkStarFill } = icons;

const Item = ({ title, address, attributes, description, images, star, user }) => {
    const [isHoverHeart, setisHoverHeart] = useState(false);
    return (
        <div className="w-full flex border-t-1 border-t-red-500 py-4">
            {/* <div className="w-2/5 flex flex-wrap gap-[2px] items-center relative">
 
                {images.length > 4
                    ? images
                          .filter((i, index) => indexs.some((i) => i === index))
                          ?.map((i, index) => (
                              <img
                                  key={index}
                                  src={i}
                                  alt="preview"
                                  className="w-[140px] h-[120px] object-cover"
                              />
                          ))
                    : images.map((i, index) => (
                          <img
                              key={index}
                              src={i}
                              alt="preview"
                              className="w-[140px] h-[120px] object-cover"
                          />
                      ))}
                {images.length > 0 && (
                    <span className="bg-overlay-50 text-white p-1 text-xs rounded-md absolute bottom-1 left-1">
                        {images.length} ảnh
                    </span>
                )}
                <span
                    className="text-white absolute bottom-1 right-5"
                    onMouseEnter={() => setisHoverHeart(true)}
                    onMouseLeave={() => setisHoverHeart(false)}
                >
                    {!isHoverHeart ? (
                        <BsHeart size={20} />
                    ) : (
                        <BsFillHeartFill size={20} className="text-pink-600" />
                    )}
                </span>
            </div> */}
            <div className="w-2/5 relative">
                {images.length > 0 && (
                    <>
                        <img
                            src={images[0]}
                            alt="preview"
                            className="w-full h-full max-w-[280px] max-h-[280px] object-cover border border-gray-300"
                        />
                        <span className="bg-overlay-50 text-white p-1 text-xs rounded-md absolute bottom-1 left-1">
                            {images.length} ảnh
                        </span>
                    </>
                )}
                <span
                    className="absolute bottom-1 right-5"
                    onMouseEnter={() => setisHoverHeart(true)}
                    onMouseLeave={() => setisHoverHeart(false)}
                >
                    {!isHoverHeart ? (
                        <BsHeart size={20} className="text-gray-500" />
                    ) : (
                        <BsFillHeartFill size={20} className="text-pink-600" />
                    )}
                </span>
            </div>
            <div className="w-3/5 flex flex-col gap-3 pr-3">
                <div className="flex items-start justify-between">
                    <Link
                        to={"/"}
                        className="gap-2 text-red-600 uppercase font-semibold hover:cursor-pointer hover:underline line-clamp-2"
                    >
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
                        <GrStar size={20} className=" star-item text-yellow-400 shrink-0" />
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
                        {address}
                    </Link>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3">{description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="	https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/05/23/anh-2-1-590x308_1653278194.jpg"
                            alt="avatar"
                            className="w-[30px] h-[30px] object-cover rounded-full"
                        />
                        <span className="ml-2 text-sm text-gray-400">{user?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="py-[2px] px-1 text-sm bg-blue-700  outline outline-1 outline-blue-700  text-white rounded-md">
                            Gọi ${user?.zalo}
                        </button>
                        <button className="py-[2px] px-1 text-sm bg-white text-blue-700 outline outline-1 outline-blue-700 rounded-md">
                            Nhắn zalo
                        </button>
                    </div>
                </div>
                <span className="float-right text-sm text-gray-400">{attributes?.published}</span>
            </div>
        </div>
    );
};

Item.propTypes = {};

export default memo(Item);
