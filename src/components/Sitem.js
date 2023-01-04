import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/vi";
const star = [1, 2, 3, 4, 5];

const Sitem = ({ title, images, star, price, time }) => {
    return (
        <div className="flex py-2 border-b border-gray-300">
            <figure className="w-[65px] h-[65px] rounded-md overflow-hidden shrink-0">
                <img className="w-full h-full" src={images[0]} alt={title} />
            </figure>
            <div className="flex-1 flex flex-col justify-between ml-3">
                <p className="text-sm text-blue-700 line-clamp-2 select-none">{title}</p>
                <div className="flex justify-between items-baseline">
                    <strong className="text-green-500 text-md">{price}</strong>
                    <span className="text-sm text-gray-400">{moment(time).fromNow()}</span>
                </div>
            </div>
        </div>
    );
};

Sitem.propTypes = {};

export default Sitem;
