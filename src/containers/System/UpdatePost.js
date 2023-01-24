import React, { memo } from "react";
import PropTypes from "prop-types";
import CreatePost from "./CreatePost";
const UpdatePost = ({ setisEdit }) => {
    // console.log(dataEdit);
    return (
        <div
            className="bg-white max-w-1100 w-full mx-auto overflow-y-scroll"
            onClick={(e) => e.stopPropagation()}
        >
            <CreatePost isEdit setisEdit={setisEdit} />
        </div>
    );
};

UpdatePost.propTypes = {};

export default memo(UpdatePost);
