import { memo } from "react";

function Button({
    onClick,
    text,
    textColor,
    bgColor,
    Icon,
    isAfter = false,
    isBefore = false,
    disabled = false,
    fullWidth = false,
    type,
    className,
}) {
    // console.log("render");
    // if(disabled) {
    //     Object.keys()
    // }
    const classes = `px-3 py-2 ${textColor} ${bgColor} flex items-center justify-center m-auto gap-1 outline-none rounded-md hover:underline ${
        fullWidth ? "w-full" : ""
    } ${className}`;
    return (
        <button onClick={onClick} type={type || "button"} className={classes}>
            {isBefore && <span>{<Icon />}</span>}
            <span>{text}</span>
            {isAfter && <span>{<Icon />}</span>}
        </button>
    );
}

export default memo(Button);
