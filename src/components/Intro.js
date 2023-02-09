import React, { memo } from "react";
import PropTypes from "prop-types";
import * as data from "../untils/data";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../untils/common/fn";
import { Col, Row } from "antd";

const { text } = data;

const Intro = (props) => {
  const { categories } = useSelector((state) => state.app);
  // console.log(categories);
  return (
    <div
      className="border border-gray-300
    rounded-md bg-white shadow-md  p-4"
    >
      <h3 className="font-semibold text-gray-900 text-lg text-center">{text.title}</h3>
      <p className="text-center text-gray-600 text-sm p-4">
        {text.description1}
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <Link
                className="text-blue-400 text-base font-semibold hover:text-orange-600 px-1"
                to={formatVietnameseToString(item.value)}
                key={item.code}
              >
                {item.value.toLowerCase()},
              </Link>
            );
          })}
        {text.description2}
      </p>
      <Row gutter={16}>
        {text.statistical.map((item, index) => {
          return (
            <Col xs={12} md={12} lg={6} key={index}>
              <div className="flex flex-col justify-center">
                <span className="text-xl text-gray-800 font-bold text-center">{item.value}+</span>
                <span className="text-sm text-black text-center">{item.name}</span>
              </div>
            </Col>
          );
        })}
      </Row>
      <div className="py-7 flex flex-col gap-4">
        <h5 className="font-semibold text-black text-lg text-center">{text.price}</h5>
        <div>{}</div>
        <p className="text-center italic text-sm text-black"> {text.comment}</p>
        <p className="text-center text-sm text-black"> {text.author}</p>
      </div>
      <div className="pb-10">
        <h5 className="font-semibold text-black text-lg text-center">{text.question}</h5>
        <p className="text-center py-2 text-sm text-black">{text.answer}</p>
        <Button text="Đăng tin ngay" bgColor="bg-secondary2" textColor="text-white" />
      </div>
    </div>
  );
};

Intro.propTypes = {};

export default memo(Intro);
