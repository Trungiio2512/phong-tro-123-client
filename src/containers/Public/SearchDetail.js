import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { ItemSidebar, RelatedPost } from "../../components";
import { List, Panigation } from "./components";

const SearchDetail = (props) => {
  const location = useLocation();
  const titleSearch = location.state?.titleSearch;
  const { prices, areas } = useSelector((state) => state.app);
  const titleRef = useRef();
  useEffect(() => {
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="">
        <h1 ref={titleRef} className=" font-semibold text-gray-700 text-3xl mb-1">
          {titleSearch || "Kết quả tim kiếm"}
        </h1>
        <p className="text-[#65676b] text-sm">{`${titleSearch || ""}`}</p>
      </div>
      <Row className="lg:flex-row flex-col-reverse" gutter={[{ lg: 8 }, { sm: 8, md: 16, lg: 24 }]}>
        <Col xs={24} md={24} lg={16}>
          <List />
          <Panigation />
        </Col>

        <Col xs={24} md={24} lg={8}>
          <div className={"flex lg:flex-col md:flex-row flex-col gap-3"}>
            <ItemSidebar type="priceCode" title="xem theo gia" isDouble content={prices} />
            <ItemSidebar title="xem theo dien tich" type="areaCode" isDouble content={areas} />
            <RelatedPost />
          </div>
        </Col>
      </Row>
    </div>
  );
};

SearchDetail.propTypes = {};

export default SearchDetail;
