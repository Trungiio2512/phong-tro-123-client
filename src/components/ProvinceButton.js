import React, { memo } from "react";
import PropTypes from "prop-types";

const ProvinceButton = ({ name, img }) => {
    return (
        <div className="rounded-lg overflow-hidden hover:cursor-pointer shadow-type1 hover:shadow-type2 bg-slate-200">
            <img src={img} alt={name} className="w-[190px] h-[110px] object-cover " />
            <span className="w-full font-semibold text-sm text-blue-500 py-3 px-[10px] inline-block hover:text-orange-500 text-center">
                {name}
            </span>
        </div>
    );
};

ProvinceButton.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
};

export default memo(ProvinceButton);
