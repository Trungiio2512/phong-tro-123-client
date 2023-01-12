import React, { memo } from "react";
import PropTypes from "prop-types";

const Select = ({
    label,
    options,
    value,
    setValue = () => {},
    type,
    reset,
    name,
    invalidFields,
    setinvalidFields,
}) => {
    const handleError = () => {
        const nameValid = invalidFields?.find((item) => item.name === name);
        const addressValid = invalidFields?.find((item) => item.name === "address");
        let text = nameValid ? nameValid.message : addressValid ? addressValid.message : null;
        return text;
    };
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="select" className="font-medium text-md">
                {label}
            </label>
            <select
                value={reset ? "" : value}
                onChange={(e) =>
                    name
                        ? setValue((prev) => {
                              return {
                                  ...prev,
                                  [name]: e.target.value,
                              };
                          })
                        : setValue(e.target.value)
                }
                onBlur={() => setinvalidFields([])}
                id="select"
                className="outline-none border border-gray-300 px-2 py-1 bg-white rounded-md text-sm"
            >
                <option value="">{`--Chọn ${label}--`}</option>
                {options.length > 0 &&
                    options?.map((option) => {
                        return (
                            <option
                                key={
                                    type === "province"
                                        ? option?.province_id
                                        : type === "district"
                                        ? option?.district_id
                                        : type === "ward"
                                        ? option?.ward_id
                                        : option?.code
                                }
                                value={
                                    type === "province"
                                        ? option?.province_id
                                        : type === "district"
                                        ? option?.district_id
                                        : type === "ward"
                                        ? option?.ward_id
                                        : option?.code
                                }
                            >
                                {type === "province"
                                    ? option?.province_name
                                    : type === "district"
                                    ? option?.district_name
                                    : type === "ward"
                                    ? option?.ward_name
                                    : option?.value}
                            </option>
                        );
                    })}
            </select>
            <small className="text-red-500">{handleError()}</small>
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    option: PropTypes.array,
    value: PropTypes.string,
    setValue: PropTypes.func,
    type: PropTypes.string,
    reset: PropTypes.bool,
};

export default memo(Select);
