import React from "react";
import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonCutom = ({
    baseColor = "#ccc",
    highlightColor = "#999",
    height,
    count,
    className,
    circle = false,
    containerClassName,
}) => {
    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <Skeleton
                containerClassName={containerClassName}
                className={className}
                height={height}
                count={count}
                circle={circle}
            />
        </SkeletonTheme>
    );
};

SkeletonCutom.propTypes = {
    baseColor: PropTypes.string,
    highlightColor: PropTypes.string,
};

export default SkeletonCutom;
