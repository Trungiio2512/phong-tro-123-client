import React, { memo } from "react";
import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";
const LoadingCircle = (props) => {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            // visible={true}
        />
    );
};

LoadingCircle.propTypes = {};

export default memo(LoadingCircle);
