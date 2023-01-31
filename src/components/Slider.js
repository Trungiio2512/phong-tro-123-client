import React, { memo } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ButtonSlider from "./ButtonSlider";

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <ButtonSlider next />,
  prevArrow: <ButtonSlider prev />,
};
const SliderPost = ({ images }) => {
  return (
    <Slider {...settings}>
      {images.length > 0 &&
        images?.map((image, index) => {
          return (
            <figure key={index} className="w-full h-[335px] overflow-hidden ">
              <img className="w-full h-full object-contain " src={image} alt={image} />
            </figure>
          );
        })}
    </Slider>
  );
};

SliderPost.propTypes = {};

export default memo(SliderPost);
