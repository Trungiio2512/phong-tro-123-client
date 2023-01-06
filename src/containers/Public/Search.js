import React, { useState } from "react";
import PropTypes from "prop-types";
import { SearchItem, Modal } from "../../components";
import icons from "../../untils/icons";
import { useSelector } from "react-redux";

const { HiOutlineLocationMarker, TbReportMoney, BsChevronRight, SlCrop, MdApartment, FiSearch } =
    icons;

const Search = () => {
    const { provinces, prices, areas, categories } = useSelector((state) => state.app);

    const [queries, setqueries] = useState({});
    const [showModal, setshowModal] = useState(false);
    const [name, setname] = useState("");
    const [type, settype] = useState(0);
    const [content, setcontent] = useState("");
    const [objMinMax, setobjMinMax] = useState({});

    const handleShowModal = (content, name) => {
        setcontent(content);
        setname(name);
        setshowModal(true);
    };

    const handleSubmit = (query, objMinMAx) => {
        setshowModal(false);
        setqueries((prev) => {
            return { ...prev, ...query };
        });
        objMinMax && setobjMinMax((prev) => ({ ...prev, ...objMinMAx }));
    };
    // console.log(queries);
    return (
        <>
            <div className="p-[10px] w-4/5 rounded-lg bg-[#febb02] flex flex-col lg:flex-row items-center justify-around gap-2">
                <div
                    onClick={() => handleShowModal(categories, "category")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        fontWeight
                        iconBefore={<MdApartment className="shrink-0" />}
                        text={queries?.category}
                        defaultText={"Phòng trọ - Nhà trọ"}
                    />
                </div>
                <div
                    onClick={() => handleShowModal(provinces, "province")}
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
                    onClick={() => handleShowModal(prices, "price")}
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
                    onClick={() => handleShowModal(areas, "area")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        iconBefore={<SlCrop className="shrink-0" />}
                        iconAfter={<BsChevronRight className="shrink-0" />}
                        text={queries?.area}
                        defaultText={"Chọn diện tích"}
                    />
                </div>
                <button className="w-full rounded-md text-white font-semibold outline-none px-4 py-2 bg-secondary1 text-sm flex items-center gap-2">
                    <FiSearch />
                    <span>Tìm kiếm</span>
                </button>
            </div>
            {showModal && (
                <Modal
                    handleShowModal={setshowModal}
                    content={content}
                    name={name}
                    type={type}
                    queries={queries}
                    handleSubit={handleSubmit}
                    objMinMax={objMinMax}
                />
            )}
        </>
    );
};

Search.propTypes = {};

export default Search;
