import React from "react";
import PropTypes from "prop-types";
import { Button, SearchItem } from "../../components";
import icons from "../../untils/icons";

const Search = (props) => {
    return (
        <div className="p-[10px] rounded-lg bg-[#febb02] flex flex-col lg:flex-row items-center justify-around gap-2">
            <SearchItem fontWeight IconBefore={icons.MdApartment} text="Phong tro nha tro" />
            <SearchItem
                IconBefore={icons.CiLocationOn}
                IconAfter={icons.BsChevronRight}
                text="Toan quoc"
            />
            <SearchItem
                IconBefore={icons.TbReportMoney}
                IconAfter={icons.BsChevronRight}
                text="Chon gia"
            />
            <SearchItem
                IconBefore={icons.SlCrop}
                IconAfter={icons.BsChevronRight}
                text="Chon dien tich"
            />
            <button className="w-full rounded-md text-white font-semibold outline-none px-4 py-2 bg-secondary1 text-sm flex items-center gap-2">
                <icons.FiSearch />
                <span>Tìm kiếm</span>
            </button>
        </div>
    );
};

Search.propTypes = {};

export default Search;
