import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ListItem = ({ posts, loading, counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }) => {
    return (
        <div className="w-full">
            {!loading ? (
                posts.length > 0 ? (
                    posts?.map((post) => {
                        return (
                            <Item
                                key={post?.id}
                                title={post?.title}
                                address={post?.address}
                                attributes={post?.attributesData}
                                description={JSON.parse(post?.description)}
                                images={JSON.parse(post?.imagesData?.images)}
                                star={+post?.star}
                                user={post?.userData}
                                id={post?.id}
                                categoryCode={post?.categoryCode}
                                labelCode={post?.labelData?.code}
                            />
                        );
                    })
                ) : (
                    <h2>Không tìm thấy kết quả phù hợp</h2>
                )
            ) : (
                counts.map((item) => {
                    return <Item key={item} loading={loading} />;
                })
            )}
        </div>
    );
};

ListItem.propTypes = {};

export default ListItem;
