import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/vi";
import SkeletonCustom from "./SkeletonCutom";
const star = [1, 2, 3, 4, 5];

const Sitem = ({ title, images, star, price, time, loading }) => {
    return (
        <div className="flex py-2 border-b border-gray-300">
            <figure className="w-[65px] h-[65px] rounded-md overflow-hidden shrink-0">
                {loading ? (
                    <SkeletonCustom height={"100%"} />
                ) : (
                    <img className="w-full h-full" src={images[0]} alt={title} />
                )}
            </figure>
            <div className="flex-1 flex flex-col justify-between ml-3">
                <p className="text-sm text-blue-700 line-clamp-2 select-none">
                    {loading ? <SkeletonCustom count={2} /> : title}
                </p>
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
