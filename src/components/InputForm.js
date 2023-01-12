import { memo } from "react";

function Input({ label, type, value, setValue, name, error }) {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="text-md mb-1 select-none">
                    {label}
                </label>
            )}
            <input
                value={value}
                onChange={setValue}
                type={type ? type : "text"}
                id={name}
                className="w-full outline-none rounded-md bg-[#e8f0fe] hover:cursor-text caret-purple-400 p-2 text-lg"
            />

            {error && <small className="text-red-400 italic">{error}</small>}
        </div>
    );
}

export default memo(Input);
