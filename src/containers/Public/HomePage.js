import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { textHome } from "../../untils/constant";
import { ItemSidebar, Provice, RelatedPost } from "../../components";
import { List, Panigation } from "./components";

const HomePage = (props) => {
    const { categories, prices, areas } = useSelector((state) => state.app);
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
                    <ItemSidebar content={categories} title={"Xem theo danh sách cho thuê"} />
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

HomePage.propTypes = {};

export default HomePage;
