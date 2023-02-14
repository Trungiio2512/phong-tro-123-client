import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { textHome } from "../../untils/constant";
import { ItemSidebar, Provice, RelatedPost } from "../../components";
import { List, Panigation } from "./components";
import * as actions from "../../store/actions";
import { formatVietnameseToString } from "../../untils/common/fn";
import { Col, Row } from "antd";

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
    <div className="w-full flex flex-col gap-3">
      <div className="">
        <h1 className="font-semibold text-gray-700 text-3xl mb-1">{currentCategory?.header}</h1>
        <p className="text-[#65676b] text-sm">{currentCategory?.subheader}</p>
      </div>
      <Provice />
      <Row className="lg:flex-row flex-col-reverse" gutter={[{ lg: 8 }, { sm: 8, md: 16, lg: 24 }]}>
        <Col xs={24} md={24} lg={16}>
          <List categoryCode={currentCategory?.code} />
          <Panigation />
        </Col>
        <Col xs={24} md={24} lg={8}>
          <div className={"flex lg:flex-col md:flex-row flex-col gap-3"}>
            <ItemSidebar type="priceCode" title="Xem theo giá" isDouble content={prices} />
            <ItemSidebar title="Xem theo diện tích" type="areaCode" isDouble content={areas} />
            <RelatedPost />
          </div>
        </Col>
      </Row>
    </div>
  );
};

Rentail.propTypes = {};

export default Rentail;
