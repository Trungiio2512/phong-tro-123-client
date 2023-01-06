import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { textHome } from "../../untils/constant";
import { ItemSidebar, Provice, RelatedPost } from "../../components";
import { List, Panigation } from "./index";
import {
    getCodeAreas,
    getCodePrices,
    getCodesAreasNeedFind,
    getCodesPricesNeedFind,
} from "../../untils/common/getCodes";

const HomePage = (props) => {
    // console.log(page);
    const { categories, prices, areas } = useSelector((state) => state.app);
    // console.log(getCodePrices(prices));
    // console.log(getCodeAreas(areas));
    console.log(getCodesPricesNeedFind([3.5, 9], prices));
    return (
        <div className=" w-full flex flex-col gap-3">
            <div className="">
                <h1 className="font-semibold text-gray-700 text-3xl mb-1">{textHome.HOME_TITLE}</h1>
                <p className="text-[#65676b] text-sm">{textHome.HOME_DESCRIPTION}</p>
            </div>
            <Provice />
            <div className="w-full flex gap-4 ">
                <div className="w-[70%]">
                    {" "}
                    <List />
                    <Panigation />
                </div>
                <div className="w-[30%] flex flex-col items-center gap-4">
                    <ItemSidebar content={categories} title={"danh sach cho thue"} />
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

HomePage.propTypes = {};

export default HomePage;
