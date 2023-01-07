import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import icons from "../untils/icons";
import { getNumberAreas, getNumberPrices } from "../untils/common/fn";
import { getCodesAreasNeedFind, getCodesPricesNeedFind } from "../untils/common/getCodes";

const { GrNext, GrLinkPrevious } = icons;
const Modal = ({
    handleShowModal = () => {},
    content,
    name,
    handleSubit = () => {},
    queries,
    objMinMax,
    defaultText,
}) => {
    // console.log(content);
    const [persent1, setpersent1] = useState(
        name === "price" && objMinMax?.priceArr
            ? objMinMax?.priceArr[0]
            : name === "area" && objMinMax?.areaArr
            ? objMinMax?.areaArr[0]
            : 0,
    );
    const [persent2, setpersent2] = useState(
        name === "price" && objMinMax?.priceArr
            ? objMinMax?.priceArr[1]
            : name === "area" && objMinMax?.areaArr
            ? objMinMax?.areaArr[1]
            : 100,
    );

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
        if (name === "price") {
            result = Math.ceil(Math.round((persent * 1.5) / 5) * 5) / 10;
        } else if (name === "area") {
            result = Math.ceil(Math.round((persent * 0.9) / 5) * 5);
        }
        return result;
    };

    const convertTargetTo100 = (persent) => {
        let result;
        if (name === "price") {
            result = Math.round((persent / 15) * 100);
        } else if (name === "area") {
            result = Math.round((persent / 90) * 100);
        }
        return result;
    };

    const handleActive = (code, value) => {
        setactiveEl(code);
        if (name === "price") {
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
        } else if (name === "area") {
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

    const handleBeforeSubmit = () => {
        let newArrMinMax =
            persent1 < persent2
                ? [convert100toTarget(persent1), convert100toTarget(persent2)]
                : [convert100toTarget(persent2), convert100toTarget(persent1)];
        // const gapsValue =
        //     name === "price"
        //         ? getCodesPricesNeedFind(newArrMinMax, content)
        //         : name === "area"
        //         ? getCodesAreasNeedFind(newArrMinMax, content)
        //         : [];
        // console.log(gapsValue);
        handleSubit(
            {
                [`${name}Number`]: newArrMinMax,
                // [`${name}Code`]: gapsValue.map((item) => item.code),
                [name]: handleResultText(),
            },
            { [`${name}Arr`]: [persent1, persent2] },
        );
    };

    const handleResultText = useCallback(() => {
        return persent1 === 100 && persent2 === 100
            ? `Trên ${convert100toTarget(persent1)} ${name === "price" ? `triệu` : `m2`}`
            : `Từ ${
                  persent1 <= persent2 ? convert100toTarget(persent1) : convert100toTarget(persent2)
              } đến ${
                  persent2 >= persent1 ? convert100toTarget(persent2) : convert100toTarget(persent1)
              } ${name === "price" ? `triệu` : `m2`}`;
    }, [name, persent1, persent2]);

    useEffect(() => {
        if (name === "price" || name === "area") {
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
            className="fixed inset-0 bg-overlay-70 z-10 flex items-center justify-center"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="max-w-[700px] h-[500px] p-4 w-full rounded-md  flex flex-col bg-white "
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
                {(name === "province" || name === "category") && (
                    <ul>
                        <li className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:text-blue-500">
                            <input
                                type={"radio"}
                                name={name}
                                id="default"
                                value={defaultText || ""}
                                checked={!queries[`${name}Code`] ? true : false}
                                onChange={() =>
                                    handleSubit({
                                        [name]: defaultText,
                                        [`${name}Code`]: null,
                                    })
                                }
                            />
                            <label className="flex-1 " htmlFor={"default"}>
                                {defaultText}
                            </label>
                        </li>
                        {content.length &&
                            content.map((item) => {
                                return (
                                    <li
                                        key={item?.code}
                                        className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:text-blue-500"
                                    >
                                        <input
                                            type={"radio"}
                                            id={item?.code}
                                            name={name}
                                            value={item?.value}
                                            checked={item?.code === queries[`${name}Code`]}
                                            onChange={() =>
                                                handleSubit({
                                                    [name]: item?.value,
                                                    [`${name}Code`]: item?.code,
                                                })
                                            }
                                        />
                                        <label className="flex-1 " htmlFor={item?.code}>
                                            {item?.value}
                                        </label>
                                    </li>
                                );
                            })}
                    </ul>
                )}
                {(name === "price" || name === "area") && (
                    <>
                        <div className="my-6">
                            <h2 className="text-center font-bold text-xl text-orange-600">
                                {handleResultText()}
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
                                {name === "price" ? "15 triệu +" : name === "area" ? "90m2" : ""}
                            </span>
                        </div>
                        <div className="flex my-7 flex-wrap gap-5">
                            {content.length &&
                                content?.map((item) => {
                                    return (
                                        <button
                                            onClick={() => {
                                                handleActive(item?.code, item?.value);
                                            }}
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
                            className="w-full py-2 rounded-md bg-orange-400 text-black text-base font-medium"
                            onClick={() => handleBeforeSubmit()}
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
