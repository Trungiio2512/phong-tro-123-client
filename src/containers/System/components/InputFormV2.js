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
    invalidFields,
    setinvalidFields,
}) => {
    const handleError = () => {
        const nameValid = invalidFields?.find((item) => item.name === name);
        let text = nameValid ? nameValid.message : null;
        return text;
    };
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
                    onBlur={() => setinvalidFields([])}
                />

                {unit && (
                    <span className="p-2 border border-gray-200 bg-gray-200 rounded-tr-md rounded-br-md min-w-[60px] text-center">
                        {unit}
                    </span>
                )}
            </div>
            {small && <p className="text-sm text-gray-400">{small}</p>}
            {invalidFields.some((item) => item.name === name) && (
                <small className="text-red-500">{handleError()}</small>
            )}
        </div>
    );
};

InputFormV2.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
};

export default InputFormV2;
