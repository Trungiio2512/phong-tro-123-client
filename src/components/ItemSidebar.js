import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import icons from "../untils/icons";
const { GrNext } = icons;
const ItemSidebar = ({ content, title, isDouble = false }) => {
    const formatDouble = useCallback(() => {
        const odds = content?.filter((item1, index1) => +item1?.order % 2 !== 0);
        const evens = content?.filter((item2, index2) => +item2?.order % 2 === 0);
        const contentFormat = odds?.map((odd, index) => {
            return {
                left: odd,
                right: evens?.find((evev, i) => i === index),
            };
        });
        console.log("render");
        return contentFormat;
    }, [content]);
    // console.log(formatDouble());
    return (
        <div className="p-4 bg-white w-full rounded-lg  border border-gray-300">
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex flex-col">
                {!isDouble && content
                    ? content.map((item) => {
                          return (
                              <div
                                  key={item?.code}
                                  className="flex items-center gap-1 text-gray-400 hover:text-orange-600 cursor-pointer py-1 px-2 text-sm hover:bg-gray-100"
                              >
                                  <GrNext size={8} className="text-gray-400" />
                                  <span>{item?.value}</span>
                              </div>
                          );
                      })
                    : formatDouble()?.map((item, index) => {
                          return (
                              <div className="flex items-center" key={index}>
                                  <div
                                      key={item?.left?.code}
                                      className="flex flex-1 items-center gap-1 text-gray-400 hover:text-orange-600 cursor-pointer py-1 px-2 text-sm hover:bg-gray-100"
                                  >
                                      <GrNext size={8} className="text-gray-400" />
                                      <span>{item?.left?.value}</span>
                                  </div>
                                  <div
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
        </div>
    );
};

ItemSidebar.propTypes = {
    content: PropTypes.array,
    title: PropTypes.string,
    isDouble: PropTypes.bool,
};

export default memo(ItemSidebar);
