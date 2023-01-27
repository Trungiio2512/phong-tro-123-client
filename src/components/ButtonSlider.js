import React, { memo } from "react";
import PropTypes from "prop-types";
import icons from "../untils/icons";
const { GrPrevious, GrNext } = icons;
const ButtonSlider = ({ prev, next, onClick, className }) => {
    return (
        <button
            className={`btn-slider-playlist ${prev && "prev"} ${next && "next"}`}
            onClick={onClick}
        >
            {next && <GrNext size={24} className="text-blue-500" />}
            {prev && <GrPrevious size={24} className="text-blue-500" />}
        </button>
    );
};

const style = {};

ButtonSlider.propTypes = {};

export default memo(ButtonSlider);
