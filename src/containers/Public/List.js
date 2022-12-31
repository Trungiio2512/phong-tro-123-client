import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Item } from "../../components";
import { getPosts } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";

const List = (props) => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post);
    useEffect(() => {
        dispatch(getPosts());
    }, []);
    // console.log(posts);
    return (
        <div className="w-full  border border-gray-300 p-2 rounded-lg bg-white shadow-md">
            <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold ">Danh sach tin dang</h3>
                <span>cap nhat ngay 25-12-2022</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
                <span>Sap xep :</span>
                <Button text="Mặc định" bgColor={"bg-gray-200"} />
                <Button text="Mới nhất" bgColor={"bg-gray-200"} />
            </div>
            <div className="">
                {posts &&
                    posts.length > 0 &&
                    posts.map((post) => {
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
                            />
                        );
                    })}

                {/* <Item />
                <Item /> */}
            </div>
        </div>
    );
};

List.propTypes = {};

export default List;