import { memo } from "react";

function Input({ label, type, value, setValue, name }) {
    const idForcus = label
        .split(" ")
        .map((i) => i.charAt(0))
        .join("")
        .toUpperCase();
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={idForcus} className="uppercase text-sm mb-1">
                    {label}
                </label>
            )}
            <input
                name={name}
                value={value}
                onChange={(e) =>
                    setValue((prev) => ({ ...prev, [name]: e.target.value }))
                }
                type={type ? type : "text"}
                id={label && idForcus}
                className="w-full outline-none rounded-md bg-[#e8f0fe] hover:cursor-text caret-purple-400 p-2 text-lg"
            />
        </div>
    );
}

export default memo(Input);
