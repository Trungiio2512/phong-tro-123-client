import React, { memo } from "react";
import PropTypes from "prop-types";

const SearchItem = ({ iconBefore, iconAfter, text, fontWeight = false }) => {
    return (
        <div className="w-full bg-white p-2 rounded-md text-sm text-gray-400 flex items-center justify-between hover:shadow-lg">
            <div className="flex items-center gap-1 max-w-[160px]">
                {iconBefore}
                <span
                    className={`${
                        fontWeight ? "text-black font-medium " : ""
                    } text-ellipsis whitespace-nowrap overflow-hidden pointer-events-none select-none `}
                >
                    {text}
                </span>
            </div>
            {iconAfter}
        </div>
    );
};

SearchItem.propTypes = {
    // iconBefore: PropTypes.any,
    // iconAfter: PropTypes.any,
    // text: PropTypes.string.isRequired,
};

export default memo(SearchItem);
