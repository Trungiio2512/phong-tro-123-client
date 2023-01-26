import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { textHome } from "../../untils/constant";
import { ItemSidebar, Provice, RelatedPost } from "../../components";
import { List, Panigation } from "./components";
import * as actions from "../../store/actions";
import { formatVietnameseToString } from "../../untils/common/fn";

const Rentail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { prices, areas, categories } = useSelector((state) => state.app);
    const [currentCategory, setCurrentCategory] = useState({});
    useEffect(() => {
        // từ state categories dựa theo pathname của trang đó lấy ra category trang đó
        const category = categories.find(
            (i) => `/${formatVietnameseToString(i.value)}` === location.pathname,
        );
        // console.log(category);
        setCurrentCategory(category);
    }, [categories, location]);
    // console.log(location);
    // console.log(categories);
    return (
        <div className=" w-full flex flex-col gap-3">
            <div className="">
                <h1 className="font-semibold text-gray-700 text-3xl mb-1">
                    {currentCategory?.header}
                </h1>
                <p className="text-[#65676b] text-sm">{currentCategory?.subheader}</p>
            </div>
            <Provice />
            <div className="w-full flex gap-4 ">
                <div className="w-[70%]">
                    <List categoryCode={currentCategory?.code} />
                    <Panigation />
                </div>
                <div className="w-[30%] flex flex-col items-center gap-4">
                    <ItemSidebar type="priceCode" title="Xem theo giá" isDouble content={prices} />
                    <ItemSidebar
                        title="Xem theo diện tích"
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

Rentail.propTypes = {};

export default Rentail;
