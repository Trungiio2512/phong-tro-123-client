import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SearchItem, Modal } from "../../../components";
import icons from "../../../untils/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../../untils/constant";
import { formatVietnameseToString } from "../../../untils/common/fn";

const { HiOutlineLocationMarker, TbReportMoney, BsChevronRight, SlCrop, MdApartment, FiSearch } =
    icons;

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { provinces, prices, areas, categories } = useSelector((state) => state.app);

    const [searchParams, setSearchParams] = useSearchParams();
    const [queries, setqueries] = useState({});
    const [showModal, setshowModal] = useState(false);
    const [name, setname] = useState("");
    const [content, setcontent] = useState("");
    const [objMinMax, setobjMinMax] = useState({});
    const [defaultText, setdefaultText] = useState("");

    const handleShowModal = (content, name, defaultText) => {
        setcontent(content);
        setname(name);
        setshowModal(true);
        setdefaultText(defaultText);
    };

    const handleSubmit = (query, objMinMAx) => {
        setshowModal(false);
        setqueries((prev) => {
            return { ...prev, ...query };
        });
        objMinMax && setobjMinMax((prev) => ({ ...prev, ...objMinMAx }));
    };

    const handleSearch = () => {
        // trả về mảng có code và arr number filter
        const queriesArr = Object.entries(queries).filter(
            (item) => (item[0].includes("Code") || item[0].includes("Number")) && item[1],
        );

        // trả về mảng chưa text và number filter
        const queriesText = Object.entries(queries).filter(
            (item) => !item[0].includes("Code") || !item[0].includes("Number"),
        );

        const params = {};
        const queriesObjText = {};
        queriesArr.forEach((item) => {
            params[item[0]] = item[1];
        });

        queriesText.forEach((item) => {
            queriesObjText[item[0]] = item[1];
        });

        const titleSearch = `${
            queriesObjText.category ? queriesObjText.category : "Cho thuê tất cả"
        } ${queriesObjText.province ? `Tại ${queriesObjText.province}` : ""} ${
            queriesObjText.price ? `giá ${queriesObjText.price}` : ""
        } ${queriesObjText.area ? `diện tích ${queriesObjText.area}` : ""}`;
        // return params;
        // console.log(queries);
        // console.log(queriesArr);
        console.log(params);
        // dispatch(actions.getPostsLimit(params));
        navigate(
            {
                pathname: `/${path.SEARCH}`,
                search: `?${createSearchParams(params)}`,
            },
            {
                state: {
                    titleSearch,
                },
            },
        );
    };

    useEffect(() => {
        if (!location.pathname.includes(path.SEARCH)) {
            setobjMinMax({});
            setqueries({});
        }
    }, [location.pathname]);

    return (
        <>
            <div className="p-[10px] w-4/5 rounded-lg bg-[#febb02] flex flex-col lg:flex-row items-center justify-around gap-2">
                <div
                    onClick={() => handleShowModal(categories, "category", "Tìm tất cả")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        fontWeight
                        iconBefore={<MdApartment className="shrink-0" />}
                        text={queries?.category}
                        defaultText={"Tìm tất cả"}
                    />
                </div>
                <div
                    onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        iconBefore={<HiOutlineLocationMarker className="shrink-0" />}
                        iconAfter={<BsChevronRight className="shrink-0" />}
                        text={queries?.province}
                        defaultText={"Toàn quốc"}
                    />
                </div>
                <div
                    onClick={() => handleShowModal(prices, "price", "Chọn giá")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        iconBefore={<TbReportMoney className="shrink-0" />}
                        iconAfter={<BsChevronRight className="shrink-0" />}
                        text={queries?.price}
                        defaultText={"Chọn giá"}
                    />
                </div>
                <div
                    onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        iconBefore={<SlCrop className="shrink-0" />}
                        iconAfter={<BsChevronRight className="shrink-0" />}
                        text={queries?.area}
                        defaultText={"Chọn diện tích"}
                    />
                </div>
                <button
                    className="w-full rounded-md text-white font-semibold outline-none px-4 py-2 bg-secondary1 text-sm flex items-center gap-2"
                    onClick={() => {
                        handleSearch();
                    }}
                >
                    <FiSearch />
                    <span>Tìm kiếm</span>
                </button>
            </div>
            {showModal && (
                <Modal
                    handleShowModal={setshowModal}
                    content={content}
                    name={name}
                    queries={queries}
                    handleSubit={handleSubmit}
                    objMinMax={objMinMax}
                    defaultText={defaultText}
                />
            )}
        </>
    );
};

Search.propTypes = {};

export default Search;
