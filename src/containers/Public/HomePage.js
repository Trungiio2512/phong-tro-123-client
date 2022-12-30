import React from "react";
import PropTypes from "prop-types";
import { textHome } from "../../untils/constant";
import { Provice } from "../../components";
import { List } from "./index";
const HomePage = (props) => {
    return (
        <div className="border border-red-400 w-full flex flex-col gap-3">
            <div className="mt-4">
                <h1 className="font-semibold text-gray-700 text-3xl mb-1">{textHome.HOME_TITLE}</h1>
                <p className="text-[#65676b] text-sm">{textHome.HOME_DESCRIPTION}</p>
            </div>
            <Provice />
            <div className="w-full flex gap-4">
                <div className="w-[70%]">
                    {" "}
                    <List />
                </div>
                <div className="w-[30%] border border-green-400">sidebar</div>
            </div>
        </div>
    );
};

HomePage.propTypes = {};

export default HomePage;
