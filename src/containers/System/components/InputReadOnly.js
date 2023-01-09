import React, { memo } from "react";
import PropTypes from "prop-types";

const InputReadOnly = ({ label, value }) => {
    return (
        <div>
            <h3 className="font-medium">{label}</h3>
            <input
                type={"text"}
                readOnly
                className="border border-gray-300 outline-none p-2 w-full rounded-md bg-gray-200"
                value={value}
                // onChange={() => {}}
            />
        </div>
    );
};

InputReadOnly.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
};

export default memo(InputReadOnly);
