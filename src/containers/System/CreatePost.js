import React from "react";
import PropTypes from "prop-types";
import { Address, OverView } from "./components";

const CreatePost = (props) => {
    return (
        <div className="px-8 h-full ">
            <h1 className="font-semibold text-3xl py-4 border-b-1 border-gray-300">Đăng tin mới</h1>
            <div className="flex gap-4">
                <div className="flex flex-auto flex-col gap-3">
                    <Address />
                    <OverView />
                </div>
                <div className="w-[40%]">Map</div>
            </div>
        </div>
    );
};

CreatePost.propTypes = {};

export default CreatePost;
