import React from "react";
import PropTypes from "prop-types";
import { SearchItem } from "../../components";
import icons from "../../untils/icons";

const { HiOutlineLocationMarker, TbReportMoney, BsChevronRight, SlCrop, MdApartment, FiSearch } =
    icons;

const Search = () => {
    return (
        <div className="p-[10px] w-4/5 rounded-lg bg-[#febb02] flex flex-col lg:flex-row items-center justify-around gap-2">
            <SearchItem
                fontWeight
                iconBefore={<MdApartment className="shrink-0" />}
                text="Phong tro nha tro"
            />{" "}
            <SearchItem
                iconBefore={<HiOutlineLocationMarker className="shrink-0" />}
                iconAfter={<BsChevronRight className="shrink-0" />}
                text="Toan quoc"
            />
            <SearchItem
                iconBefore={<TbReportMoney className="shrink-0" />}
                iconAfter={<BsChevronRight className="shrink-0" />}
                text="Chon gia"
            />
            <SearchItem
                iconBefore={<SlCrop className="shrink-0" />}
                iconAfter={<BsChevronRight className="shrink-0" />}
                text="Chon dien tich"
            />
            <button className="w-full rounded-md text-white font-semibold outline-none px-4 py-2 bg-secondary1 text-sm flex items-center gap-2">
                <FiSearch />
                <span>Tìm kiếm</span>
            </button>
        </div>
    );
};

Search.propTypes = {};

export default Search;
