import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import icons from "../untils/icons";

const { GrNext, GrLinkPrevious } = icons;
const Modal = ({ handleShowModal = () => {}, content, name, type }) => {
    // console.log(content);
    const [persent1, setpersent1] = useState(10);
    const [persent2, setpersent2] = useState(50);

    const [activeEl, setactiveEl] = useState("");

    const handleStrack = (e, value) => {
        // e.stopPropagation();
        const track = document.getElementById("track");
        const trackReact = track.getBoundingClientRect();

        let persent = value
            ? value
            : (Math.round(e.clientX - trackReact.left) * 100) / trackReact.width;
        // console.log(persent);
        // console.log(e);
        if (Math.abs(persent - persent1) <= Math.abs(persent - persent2)) {
            setpersent1(persent);
        } else {
            setpersent2(persent);
        }
    };

    const convert100toTarget = (persent) => {
        let result;
        if (name === "prices") {
            result = Math.ceil(Math.round((persent * 1.5) / 5) * 5) / 10;
        } else if (name === "areas") {
            result = Math.ceil(Math.round((persent * 0.9) / 5) * 5);
        }
        return result;
    };

    const convertTargetTo100 = (persent) => {
        let result;
        if (name === "prices") {
            result = Math.round((persent / 15) * 100);
        } else if (name === "areas") {
            result = Math.round((persent / 90) * 100);
        }
        return result;
    };
    const getNumberPrices = (string) => {
        let arr = string.split(" ");
        const numbers = arr.filter((item) => isFinite(+item) && !isNaN(+item));
        return numbers;
    };

    const getNumberAreas = (string) => {
        let arr = string.split(" ");
        const numbers = arr.map((item) => +item.match(/\d+/)).filter((item) => item !== 0);
        return numbers;
    };

    const handleActive = (code, value) => {
        setactiveEl(code);
        if (name === "prices") {
            const arrMinMax = getNumberPrices(value);

            if (arrMinMax.length === 1) {
                if (+arrMinMax[0] === 1) {
                    setpersent1(0);
                    setpersent2(convertTargetTo100(1));
                }
                if (+arrMinMax[0] === 15) {
                    setpersent1(100);
                    setpersent2(100);
                }
            } else if (arrMinMax.length === 2) {
                setpersent1(convertTargetTo100(+arrMinMax[0]));
                setpersent2(convertTargetTo100(+arrMinMax[1]));
            }
        } else if (name === "areas") {
            const arrMinMax = getNumberAreas(value);

            if (arrMinMax.length === 1) {
                if (+arrMinMax[0] === 20) {
                    setpersent1(0);
                    setpersent2(convertTargetTo100(20));
                }
                if (+arrMinMax[0] === 90) {
                    setpersent1(100);
                    setpersent2(100);
                }
            } else if (arrMinMax.length === 2) {
                setpersent1(convertTargetTo100(+arrMinMax[0]));
                setpersent2(convertTargetTo100(+arrMinMax[1]));
            }
        }
    };

    const handleSubmit = () => {
        console.log(convert100toTarget(persent1));
        console.log(convert100toTarget(persent2));
    };

    useEffect(() => {
        if (name === "prices" || name === "areas") {
            const trackActive = document.getElementById("track-active");

            if (persent2 <= persent1) {
                trackActive.style.left = `${persent2}%`;
                trackActive.style.right = `${100 - persent1}%`;
            } else {
                trackActive.style.left = `${persent1}%`;
                trackActive.style.right = `${100 - persent2}%`;
            }
        } else return;
    }, [name, persent1, persent2]);

    return (
        <div
            onClick={(e) => {
                handleShowModal(false);
            }}
            className="fixed inset-0 bg-overlay-70 z-10 flex"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="max-w-[700px] p-4 w-full rounded-md m-auto bg-white "
            >
                <div className="h-[45px] items-center justify-between border-b-1 border-gray-300">
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShowModal(false);
                        }}
                        className="cursor-pointer"
                    >
                        <GrLinkPrevious size={24} />
                    </span>
                </div>
                {(name === "provinces" || name === "categories") && (
                    <ul>
                        {content.length &&
                            content.map((item) => {
                                return (
                                    <li
                                        key={item?.code}
                                        className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:text-blue-500"
                                    >
                                        <input
                                            type={"radio"}
                                            id={item?.lcode}
                                            name={name}
                                            value={item?.value}
                                        />
                                        <label className="flex-1 " htmlFor={item?.code}>
                                            {item?.value}
                                        </label>
                                    </li>
                                );
                            })}
                    </ul>
                )}
                {(name === "prices" || name === "areas") && (
                    <>
                        <div className="my-6">
                            <h2 className="text-center font-bold text-xl text-orange-600">
                                {`Từ ${
                                    persent1 <= persent2
                                        ? convert100toTarget(persent1)
                                        : convert100toTarget(persent2)
                                } đến ${
                                    persent2 >= persent1
                                        ? convert100toTarget(persent2)
                                        : convert100toTarget(persent1)
                                } ${name === "prices" ? `triệu` : `m2`}`}
                            </h2>
                        </div>
                        <div className="flex relative items-center justify-center">
                            <div
                                id="track"
                                className="slider-track h-[5px]  bg-gray-300 absolute  w-full rounded-full"
                                onClick={(e) => handleStrack(e)}
                            ></div>
                            <div
                                id="track-active"
                                className="slider-track--active h-[5px] bg-orange-600 absolute rounded-full"
                                onClick={(e) => handleStrack(e)}
                            ></div>

                            <input
                                type={"range"}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full  appearance-none absolute pointer-events-none top-0 bottom-0 "
                                value={persent1}
                                onChange={(e) => {
                                    activeEl && setactiveEl("");
                                    setpersent1(Number(e.target.value));
                                }}
                            />
                            <input
                                type={"range"}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full  appearance-none absolute pointer-events-none top-0 bottom-0"
                                onChange={(e) => {
                                    activeEl && setactiveEl("");
                                    setpersent2(Number(e.target.value));
                                }}
                                value={persent2}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStrack(e, 0);
                                }}
                                className="cursor-pointer"
                            >
                                0
                            </span>
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStrack(e, 100);
                                }}
                                className="cursor-pointer"
                            >
                                {name === "prices" ? "15 triệu +" : name === "areas" ? "90m2" : ""}
                            </span>
                        </div>
                        <div className="flex my-7 flex-wrap gap-5">
                            {content.length &&
                                content?.map((item) => {
                                    return (
                                        <button
                                            onClick={() => handleActive(item?.code, item?.value)}
                                            key={item?.code}
                                            className={` cursor-pointer py-1 px-4 bg-gray-200 rounded-md  text-center ${
                                                activeEl === item?.code
                                                    ? `bg-blue-600 text-white`
                                                    : ``
                                            }`}
                                        >
                                            {item?.value}
                                        </button>
                                    );
                                })}
                        </div>
                        <button
                            className="w-full py-2 rounded-md bg-orange-400 text-black text-base font-medium "
                            onClick={() => handleSubmit()}
                        >
                            Áp dụng
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

Modal.propTypes = {};

export default memo(Modal);
