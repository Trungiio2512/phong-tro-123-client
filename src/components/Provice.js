import React from "react";
import PropTypes from "prop-types";
import { ProvinceButton } from "./index";
import { location } from "../untils/constant";

const Provice = (props) => {
  // console.log(location);
  return (
    <div className="hidden sm:flex sm:gap-3 sm:justify-center sm:items-center">
      {location && location.map((i) => <ProvinceButton key={i.id} name={i.name} img={i.image} />)}
    </div>
  );
};

Provice.propTypes = {};

export default Provice;
