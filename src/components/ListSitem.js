import React from "react";
import PropTypes from "prop-types";
import Sitem from "./Sitem";

const ListSitem = ({ counts, loading, posts }) => {
    return (
        <div className="w-full">
            {loading
                ? counts.map((item) => {
                      return <Sitem key={item} loading={loading} />;
                  })
                : posts.length > 0 &&
                  posts.map((newPost) => {
                      return (
                          <Sitem
                              key={newPost?.id}
                              title={newPost?.title}
                              price={newPost?.attributesData?.price}
                              images={JSON.parse(newPost?.imagesData?.images)}
                              id={newPost?.id}
                              star={newPost?.star}
                              time={newPost?.updatedAt}
                              labelCode={newPost?.labelData?.code}
                              categoryCode={newPost?.categoryCode}
                          />
                      );
                  })}
        </div>
    );
};

ListSitem.propTypes = {};

export default ListSitem;
