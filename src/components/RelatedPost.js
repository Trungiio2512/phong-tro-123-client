import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { Sitem } from "./index";
import { useSelector } from "react-redux";

const RelatedPost = () => {
    const { newPosts } = useSelector((state) => state.post);
    return (
        <div className="p-4 bg-white w-full rounded-lg  border border-gray-300">
            <h3 className="font-semibold text-lg">Tin moi</h3>
            <div className="w-full">
                {newPosts.length > 0 &&
                    newPosts.map((newPost) => {
                        return (
                            <Sitem
                                key={newPost?.id}
                                title={newPost?.title}
                                price={newPost?.attributesData?.price}
                                images={JSON.parse(newPost?.imagesData?.images)}
                                star={newPost?.star}
                                time={newPost?.createdAt}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

RelatedPost.propTypes = {};

export default memo(RelatedPost);
