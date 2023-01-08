import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { ItemSidebar, RelatedPost } from "../../components";
import { List, Panigation } from "./components";

const SearchDetail = (props) => {
    const location = useLocation();
    const titleSearch = location.state?.titleSearch;
    const { prices, areas } = useSelector((state) => state.app);

    return (
        <div className=" w-full flex flex-col gap-3">
            <div className="">
                <h1 className="font-semibold text-gray-700 text-3xl mb-1">
                    {titleSearch || "Kết quả tim kiếm"}
                </h1>
                <p className="text-[#65676b] text-sm">{`${titleSearch || ""}`}</p>
            </div>
            <div className="w-full flex gap-4 ">
                <div className="w-[70%]">
                    <List />
                    <Panigation />
                </div>
                <div className="w-[30%] flex flex-col items-center gap-4">
                    <ItemSidebar type="priceCode" title="xem theo gia" isDouble content={prices} />
                    <ItemSidebar
                        title="xem theo dien tich"
                        type="areaCode"
                        isDouble
                        content={areas}
                    />
                    <RelatedPost />
                </div>
            </div>
        </div>
    );
};

SearchDetail.propTypes = {};

export default SearchDetail;
