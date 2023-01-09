import React from "react";
import PropTypes from "prop-types";

const InputFormV2 = ({ label, value, setValue, unit }) => {
    return (
        <div>
            <label htmlFor="title">{label}</label>
            <div className="flex items-center">
                <input
                    type="text"
                    id="title"
                    className="w-full p-2 outline-none border border-gray-300 rounded-tl-md rounded-bl-md bg-gray-100"
                    value={value}
                    setValue={() => setValue()}
                />

                <span className="p-2 border border-gray-200 bg-gray-200 rounded-tr-md rounded-br-md min-w-[60px] text-center">
                    {unit}
                </span>
            </div>
        </div>
    );
};

InputFormV2.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
};

export default InputFormV2;
