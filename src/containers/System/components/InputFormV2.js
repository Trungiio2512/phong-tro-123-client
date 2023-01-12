import React from "react";
import PropTypes from "prop-types";

const InputFormV2 = ({ label, value, setValue, unit, name, small, type }) => {
    return (
        <div>
            <label htmlFor={name || "title"}>{label}</label>
            <div className="flex items-center">
                <input
                    type={type || "text"}
                    id={name || "title"}
                    className="w-full p-2 outline-none border border-gray-300 rounded-tl-md rounded-bl-md bg-gray-100"
                    value={value}
                    onChange={(e) =>
                        name
                            ? setValue((prev) => {
                                  return { ...prev, [name]: e.target.value };
                              })
                            : setValue(e.target.value)
                    }
                />

                {unit && (
                    <span className="p-2 border border-gray-200 bg-gray-200 rounded-tr-md rounded-br-md min-w-[60px] text-center">
                        {unit}
                    </span>
                )}
            </div>
            {small && <small className="text-sm text-gray-400">{small}</small>}
        </div>
    );
};

InputFormV2.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
};

export default InputFormV2;
