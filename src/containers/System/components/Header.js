import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Navigation } from "../../../components";
import { path } from "../../../untils/constant";
import logo_nobg from "../../../assests/logo_nobg.png";
const Header = (props) => {
    return (
        <div className="flex items-center w-full fixed top-0">
            <Navigation system />
        </div>
    );
};

Header.propTypes = {};

export default memo(Header);
