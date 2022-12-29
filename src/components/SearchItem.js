import React, { memo } from "react";
import PropTypes from "prop-types";

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight = false }) => {
    return (
        <div className="w-full bg-white p-2 rounded-md text-sm text-gray-400 flex items-center justify-between">
            <div className="flex items-center gap-1 max-w-[160px]">
                {IconBefore && <IconBefore className="shrink-0" />}
                {
                    <span
                        className={`${
                            fontWeight && "text-black font-medium "
                        } text-ellipsis whitespace-nowrap overflow-hidden`}
                    >
                        {text}
                    </span>
                }
            </div>
            {IconAfter && <IconAfter className="shrink-0" />}
        </div>
    );
};

SearchItem.propTypes = {
    IconBefore: PropTypes.any,
    IconAfter: PropTypes.any,
    text: PropTypes.string.isRequired,
};

export default memo(SearchItem);
