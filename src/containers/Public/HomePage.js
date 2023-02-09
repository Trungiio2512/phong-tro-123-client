import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { textHome } from "../../untils/constant";
import { ItemSidebar, Provice, RelatedPost } from "../../components";
import { List, Panigation } from "./components";
import { Col, Row } from "antd";

const HomePage = (props) => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  return (
    <div className=" w-full flex flex-col gap-3">
      <div className="">
        <h1 className="font-semibold text-gray-700 text-3xl mb-1">{textHome.HOME_TITLE}</h1>
        <p className="text-[#65676b] text-sm">{textHome.HOME_DESCRIPTION}</p>
      </div>
      <Provice />
      <Row className="lg:flex-row flex-col-reverse" gutter={[{ lg: 8 }, { sm: 8, md: 16, lg: 24 }]}>
        <Col xs={24} md={24} lg={16}>
          <List />
          <Panigation />
        </Col>
        <Col xs={24} md={24} lg={8}>
          <div className={"flex lg:flex-col md:flex-row flex-col gap-3"}>
            <ItemSidebar content={categories} title={"Xem theo danh sách cho thuê"} />
            <ItemSidebar type="priceCode" title="Xem theo giá" isDouble content={prices} />
            <ItemSidebar title="Xem theo diện tích" type="areaCode" isDouble content={areas} />
            <RelatedPost />
          </div>
        </Col>
      </Row>
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
