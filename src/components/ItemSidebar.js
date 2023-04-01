import React, { memo, useCallback, useState } from "react";
import { createSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import icons from "../untils/icons";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { formatVietnameseToString } from "../untils/common/fn";
const { GrNext } = icons;

const ItemSidebar = ({ content, title, isDouble = false, type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [pageValue, setPageValue] = useState("");

  const formatDouble = useCallback(() => {
    const odds = content?.filter((item1, index1) => +item1?.order % 2 !== 0);
    const evens = content?.filter((item2, index2) => +item2?.order % 2 === 0);
    const contentFormat = odds?.map((odd, index) => {
      return {
        left: odd,
        right: evens?.find((evev, i) => i === index),
      };
    });
    return contentFormat;
  }, [content]);

  // console.log(type);
  const handleFilterPosts = (code) => {
    console.log(pageValue);
    if (type === "categoryCode") {
    }
    // dispatch(actions.getPostsLimit({ [type]: code }));
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams({
        [type]: code,
      })}`,
    });
  };

  return (
    <div className="p-4 bg-white w-full rounded-lg  border border-gray-300">
      <h3 className="font-semibold text-base">{title}</h3>
      <div className="lg:flex flex-col hidden ">
        {!isDouble && content
          ? content.map((item) => {
              return (
                <Link
                  to={`/${formatVietnameseToString(item?.value)}`}
                  key={item?.code}
                  className="flex items-center gap-1 text-gray-400 hover:text-orange-600 cursor-pointer py-1 px-2 text-sm hover:bg-gray-100"
                >
                  <GrNext size={8} className="text-gray-400" />
                  <span>{item?.value}</span>
                </Link>
              );
            })
          : formatDouble()?.map((item, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <div
                    onClick={() => handleFilterPosts(item?.left?.code)}
                    key={item?.left?.code}
                    className="flex flex-1 items-center gap-1 text-gray-400 hover:text-orange-600 cursor-pointer py-1 px-2 text-sm hover:bg-gray-100"
                  >
                    <GrNext size={8} className="text-gray-400" />
                    <span>{item?.left?.value}</span>
                  </div>
                  <div
                    onClick={() => handleFilterPosts(item?.right?.code)}
                    key={item?.right?.code}
                    className="flex flex-1 items-center gap-1 text-gray-400 hover:text-orange-600 cursor-pointer py-1 px-2 text-sm hover:bg-gray-100"
                  >
                    <GrNext size={8} className="text-gray-400" />
                    <span>{item?.right?.value}</span>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="lg:hidden">
        {content.length > 0 && (
          <select
            className="outline-none w-full py-1"
            defaultValue={""}
            onChange={(e) => handleFilterPosts(e.target.value)}
          >
            <option value={""}>--Chọn--</option>
            {content.map((item) => {
              return (
                <option
                  key={item?.code}
                  value={item?.code}
                  // onChange={() => setPageValue(item.value)}
                >
                  {item?.value}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </div>
  );
};

ItemSidebar.propTypes = {
  content: PropTypes.array,
  title: PropTypes.string,
  isDouble: PropTypes.bool,
};

export default memo(ItemSidebar);
