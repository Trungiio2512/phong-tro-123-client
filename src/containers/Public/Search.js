import React, { useState } from "react";
import PropTypes from "prop-types";
import { SearchItem, Modal } from "../../components";
import icons from "../../untils/icons";
import { useSelector } from "react-redux";

const { HiOutlineLocationMarker, TbReportMoney, BsChevronRight, SlCrop, MdApartment, FiSearch } =
    icons;

const Search = () => {
    const { provinces, prices, areas, categories } = useSelector((state) => state.app);

    const [showModal, setshowModal] = useState(false);
    const [name, setname] = useState("");
    const [type, settype] = useState(0);
    const [content, setcontent] = useState("");

    const handleShowModal = (content, name) => {
        setcontent(content);
        setname(name);
        setshowModal(true);
    };
    return (
        <>
            <div className="p-[10px] w-4/5 rounded-lg bg-[#febb02] flex flex-col lg:flex-row items-center justify-around gap-2">
                <div
                    onClick={() => handleShowModal(categories, "categories")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        fontWeight
                        iconBefore={<MdApartment className="shrink-0" />}
                        text="Phong tro nha tro"
                    />
                </div>
                <div
                    onClick={() => handleShowModal(provinces, "provinces")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        iconBefore={<HiOutlineLocationMarker className="shrink-0" />}
                        iconAfter={<BsChevronRight className="shrink-0" />}
                        text="Toan quoc"
                    />
                </div>
                <div
                    onClick={() => handleShowModal(prices, "prices")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        iconBefore={<TbReportMoney className="shrink-0" />}
                        iconAfter={<BsChevronRight className="shrink-0" />}
                        text="Chon gia"
                    />
                </div>
                <div
                    onClick={() => handleShowModal(areas, "areas")}
                    className="w-full cursor-pointer"
                >
                    <SearchItem
                        iconBefore={<SlCrop className="shrink-0" />}
                        iconAfter={<BsChevronRight className="shrink-0" />}
                        text="Chon dien tich"
                    />
                </div>
                <button className="w-full rounded-md text-white font-semibold outline-none px-4 py-2 bg-secondary1 text-sm flex items-center gap-2">
                    <FiSearch />
                    <span>Tìm kiếm</span>
                </button>
            </div>
            {showModal && (
                <Modal handleShowModal={setshowModal} content={content} name={name} type={type} />
            )}
        </>
    );
};

Search.propTypes = {};

export default Search;
