import React from "react";
import PropTypes from "prop-types";
import { Search } from "../Public";
const HomePage = (props) => {
    return (
        <div className="border border-red-400 w-full flex flex-col gap-3">
            <Search /> HomePage
        </div>
    );
};

HomePage.propTypes = {};

export default HomePage;
