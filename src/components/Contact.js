import React, { memo } from "react";
import PropTypes from "prop-types";
import * as data from "../untils/data";
import Button from "./Button";
const { dataContact } = data;
const Contact = (props) => {
    return (
        <div className="w-4/5 flex flex-col items-center border border-dotted border-gray-400 rounded-md shadow-md ">
            <figure className="h-[150px]">
                <img className="object-cover w-full h-full" src={dataContact.image} alt="" />
            </figure>
            <p className="text-blue-800 text-md"> {dataContact.title}</p>
            <div className="w-full flex items-center justify-evenly">
                {dataContact.contacts?.map((item, index) => {
                    return (
                        <div className=" flex flex-col items-center" key={index}>
                            <span className="text-sm text-orange-600 font-bold ">{item.name}</span>
                            <span className="text-md text-[#233762] font-bold text-xl">
                                {item.phone}
                            </span>
                            <span className="text-md text-[#233762] font-bold text-xl">
                                {item.zalo}
                            </span>
                        </div>
                    );
                })}
            </div>
            <Button text="Gửi liên hệ" textColor={"text-white"} bgColor="bg-secondary1" />
        </div>
    );
};

Contact.propTypes = {};

export default memo(Contact);
