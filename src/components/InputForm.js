import { memo } from "react";

function Input({ label, type, value, setValue, name, invalidFields, setInvalidFields }) {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="text-md mb-1 select-none">
                    {label}
                </label>
            )}
            <input
                value={value}
                onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
                type={type ? type : "text"}
                id={name}
                onFocus={() => {
                    invalidFields.length > 0 && setInvalidFields([]);
                }}
                className="w-full outline-none rounded-md bg-[#e8f0fe] hover:cursor-text caret-purple-400 p-2 text-lg"
            />
            {invalidFields.length > 0 && invalidFields.some((i) => i.name === name) && (
                <small className="text-red-400 italic">
                    {invalidFields.find((i) => i.name === name).message}
                </small>
            )}
        </div>
    );
}

export default memo(Input);
