import React, { memo } from "react";
import PropTypes from "prop-types";

const InputReadOnly = ({ label, value, small, row = false }) => {
    return (
        <>
            <div className={`flex ${row ? "flex-row items-center" : "flex-col"}`}>
                {label && <h3 className="font-medium min-w-200">{label}</h3>}
                <input
                    type={"text"}
                    readOnly
                    className="border border-gray-300 outline-none p-2 w-full rounded-md bg-gray-200 flex-1"
                    value={value || ""}
                    // onChange={() => {}}
                />
            </div>
            {small && <p className={`${row ? "ml-200" : ""} text-sm text-blue-400`}>{small}</p>}
        </>
    );
};

InputReadOnly.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    row: PropTypes.bool,
};

export default memo(InputReadOnly);
