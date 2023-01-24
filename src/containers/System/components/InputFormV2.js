import React from "react";
import PropTypes from "prop-types";

const InputFormV2 = ({
    label,
    value,
    setValue,
    unit,
    name,
    small,
    type,
    invalidFields = [],
    setinvalidFields = () => {},
    row = false,
}) => {
    const handleError = () => {
        const nameValid = invalidFields?.find((item) => item.name === name);
        let text = nameValid ? nameValid.message : null;
        return text;
    };
    return (
        <div className="flex flex-col gap4">
            <div className={`w-full flex ${row ? "flex-row items-center " : "flex-col"}`}>
                <label className="min-w-200" htmlFor={name || "title"}>
                    {label}
                </label>
                <div className="flex items-center flex-1">
                    <input
                        type={type || "text"}
                        id={name || "title"}
                        className="w-full p-2 outline-none border border-gray-300 rounded-tl-md rounded-bl-md bg-gray-100"
                        value={value}
                        onChange={(e) => {
                            // console.log(e.target.value);
                            name
                                ? setValue((prev) => {
                                      return { ...prev, [name]: e.target.value };
                                  })
                                : setValue(e.target.value);
                        }}
                        onBlur={() => setinvalidFields && setinvalidFields([])}
                    />

                    {unit && (
                        <span className="p-2 border border-gray-200 bg-gray-200 rounded-tr-md rounded-br-md min-w-[60px] text-center">
                            {unit}
                        </span>
                    )}
                </div>
            </div>
            {small && <p className={`${row ? "ml-200" : ""} text-sm text-blue-400`}>{small}</p>}
            {invalidFields && invalidFields.some((item) => item.name === name) && (
                <small className={`${row ? "ml-200" : ""} text-red-500`}>{handleError()}</small>
            )}
        </div>
    );
};

InputFormV2.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
    small: PropTypes.string,
    row: PropTypes.bool,
};

export default InputFormV2;
