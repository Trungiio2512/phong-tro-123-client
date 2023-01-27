import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/vi";
import SkeletonCustom from "./SkeletonCutom";
import { path } from "../untils/constant";
import { formatVietnameseToString } from "../untils/common/fn";
import { Link } from "react-router-dom";
import icons from "../untils/icons";
const { BsFillBookmarkStarFill, GrStar } = icons;
// const star = [1, 2, 3, 4, 5];

const Sitem = ({ title, images, id, star, price, time, loading, categoryCode, labelCode }) => {
    // console.log(time);
    const linkDetailPost = (id) => {
        return !loading && `${path.DETAIL}/${formatVietnameseToString(title)}/${id}`;
    };
    const [stars, setstars] = useState(() => {
        const stars = [];
        for (let i = 0; i < +star; i++) {
            stars.push(<GrStar size={18} className=" star-item text-yellow-400 shrink-0" />);
        }
        return stars;
    });
    return (
        <div className="flex py-2 border-b border-gray-300">
            <figure className="w-[65px] h-[65px] rounded-md overflow-hidden shrink-0">
                {loading ? (
                    <SkeletonCustom height={"100%"} />
                ) : (
                    <img className="w-full h-full" src={images[0]} alt={title} />
                )}
            </figure>
            <div className="flex-1 flex flex-col justify-between ml-3 relative ">
                <Link
                    to={linkDetailPost(id)}
                    state={{ id: id, categoryCode, labelCode }}
                    className={`${
                        +star > 4 ? "text-red-600 flex items-center" : "text-blue-700 "
                    } text-sm line-clamp-2 select-none`}
                >
                    {stars.map((i, index) => (
                        <span key={index}>{i}</span>
                    ))}
                    {loading ? <SkeletonCustom count={2} /> : title}
                </Link>
                {!loading && +star > 4 && (
                    <div className="w-[10%] flex items-center absolute top-0 right-[-10px]">
                        {" "}
                        <BsFillBookmarkStarFill size={24} className="text-yellow-600 shrink-0" />
                    </div>
                )}
                <div className="flex justify-between items-baseline">
                    {loading ? (
                        <SkeletonCustom className={"min-w-100"} />
                    ) : (
                        <strong className="text-green-500 text-md">{price}</strong>
                    )}
                    {loading ? (
                        <SkeletonCustom className={"min-w-100"} />
                    ) : (
                        <span className="text-sm text-gray-400">{moment(time).fromNow()}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

Sitem.propTypes = {};

export default Sitem;
